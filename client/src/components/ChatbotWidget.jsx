import { MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { API_BASE_URL } from '../configs/api.js'
import {
  createReadableWhatsAppMessage,
  generateWhatsAppLink,
} from '../utils/whatsapp.js'

const fallbackMessage =
  'I can help connect you with the team on WhatsApp for the most accurate answer.'

const quickReplies = [
  'Services',
  'Pricing / Budget',
  'Location',
  'Appointment / Quote',
  'Contact on WhatsApp',
]

const ignoredWords = new Set([
  'about',
  'after',
  'answer',
  'could',
  'does',
  'from',
  'have',
  'help',
  'need',
  'that',
  'this',
  'what',
  'when',
  'where',
  'with',
  'your',
])

function createMessage(sender, text) {
  return {
    id: `${sender}-${Date.now()}-${Math.random()}`,
    sender,
    text,
  }
}

function getKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !ignoredWords.has(word))
}

function findFaqAnswer(message, faqs) {
  const messageKeywords = getKeywords(message)

  if (messageKeywords.length === 0) {
    return null
  }

  let bestMatch = null
  let bestScore = 0

  faqs.forEach((faq) => {
    const faqKeywords = getKeywords(`${faq.question} ${faq.answer}`)
    const score = messageKeywords.filter((word) => faqKeywords.includes(word)).length

    if (score > bestScore) {
      bestMatch = faq
      bestScore = score
    }
  })

  return bestScore > 0 ? bestMatch.answer : null
}

function getQuickReplyAnswer(reply, config) {
  if (reply === 'Services') {
    return `Here are the main services: ${config.services.join(', ')}.`
  }

  if (reply === 'Pricing / Budget') {
    return (
      findFaqAnswer('pricing budget cost', config.faqs) ||
      'Pricing depends on your request. Share your budget or service details in the contact form and the team can follow up.'
    )
  }

  if (reply === 'Location') {
    return (
      findFaqAnswer('location service area address', config.faqs) ||
      'Share your location in the contact form so the team can confirm availability.'
    )
  }

  if (reply === 'Appointment / Quote') {
    return (
      findFaqAnswer('appointment quote booking request showing visit', config.faqs) ||
      'Use the contact form to share your preferred date, time, and request details.'
    )
  }

  if (reply === 'Contact on WhatsApp') {
    return `${fallbackMessage} WhatsApp: ${config.whatsappNumber}`
  }

  return null
}

function ChatbotWidget({ config }) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [leadFlow, setLeadFlow] = useState(null)
  const [leadResult, setLeadResult] = useState(null)
  const [messages, setMessages] = useState(() => [
    createMessage(
      'bot',
      config.chatbotWelcomeMessage ||
        `Hi, welcome to ${config.brandName}. How can I help today?`,
    ),
  ])

  function appendMessages(newMessages) {
    setMessages((currentMessages) => [...currentMessages, ...newMessages])
  }

  function addConversationTurn(userText, botText) {
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage('user', userText),
      createMessage('bot', botText),
    ])
  }

  function startLeadCollection(reply) {
    const firstField = config.leadCollectionFields[0]

    setLeadResult(null)
    setLeadFlow({
      currentFieldIndex: 0,
      data: {},
    })
    appendMessages([
      createMessage('user', reply),
      createMessage(
        'bot',
        `Sure. I will collect a few details first. What is your ${firstField.label}?`,
      ),
    ])
  }

  async function sendLead(leadData, whatsappMessage) {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        industryKey: config.industryKey,
        brandName: config.brandName,
        source: 'chatbot',
        fields: leadData,
        whatsappMessage,
      }),
    })

    if (!response.ok) {
      throw new Error('Lead request failed')
    }

    return response.json()
  }

  async function continueLeadCollection(message) {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    const currentField = config.leadCollectionFields[leadFlow.currentFieldIndex]
    const nextData = {
      ...leadFlow.data,
      [currentField.key]: trimmedMessage,
    }
    const nextFieldIndex = leadFlow.currentFieldIndex + 1
    const nextField = config.leadCollectionFields[nextFieldIndex]

    setInputValue('')

    if (nextField) {
      setLeadFlow({
        currentFieldIndex: nextFieldIndex,
        data: nextData,
      })
      appendMessages([
        createMessage('user', trimmedMessage),
        createMessage('bot', `Got it. What is your ${nextField.label}?`),
      ])
      return
    }

    const messageData = { fields: nextData }
    const whatsappMessage = createReadableWhatsAppMessage(messageData, config)
    const preparedWhatsappUrl = generateWhatsAppLink(
      config.whatsappNumber,
      messageData,
      config,
    )

    setLeadFlow(null)
    setLeadResult({
      data: nextData,
      whatsappMessage,
      whatsappUrl: preparedWhatsappUrl,
      status: 'sending',
    })
    appendMessages([
      createMessage('user', trimmedMessage),
      createMessage(
        'bot',
        'Thanks. I collected your details and prepared a WhatsApp message.',
      ),
    ])

    try {
      await sendLead(nextData, whatsappMessage)
      setLeadResult((currentResult) => ({
        ...currentResult,
        status: 'sent',
      }))
      appendMessages([
        createMessage('bot', 'Your lead was sent to the team successfully.'),
      ])
    } catch {
      setLeadResult((currentResult) => ({
        ...currentResult,
        status: 'failed',
      }))
      appendMessages([
        createMessage(
          'bot',
          'I could not send the lead to the server, but your WhatsApp message is ready.',
        ),
      ])
    }
  }

  function answerMessage(message) {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    if (leadFlow) {
      continueLeadCollection(trimmedMessage)
      return
    }

    if (
      trimmedMessage === 'Appointment / Quote' ||
      trimmedMessage === 'Contact on WhatsApp'
    ) {
      startLeadCollection(trimmedMessage)
      setInputValue('')
      return
    }

    const quickReplyAnswer = getQuickReplyAnswer(trimmedMessage, config)
    const faqAnswer = findFaqAnswer(trimmedMessage, config.faqs)

    addConversationTurn(
      trimmedMessage,
      quickReplyAnswer || faqAnswer || fallbackMessage,
    )
    setInputValue('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    answerMessage(inputValue)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <section className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-950 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Ask {config.brandName}</p>
              <p className="text-xs text-slate-300">Simple FAQ matcher</p>
            </div>
            <button
              className="rounded-md p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                key={message.id}
              >
                <p
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
                    message.sender === 'user'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-slate-700 shadow-sm'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                  key={reply}
                  onClick={() => answerMessage(reply)}
                  type="button"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form className="flex gap-2" onSubmit={handleSubmit}>
              <input
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={leadFlow ? 'Type your answer' : 'Type your question'}
                value={inputValue}
              />
              <button
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white transition hover:bg-slate-800"
                type="submit"
                aria-label="Send message"
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </form>

            {leadResult && (
              <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs font-medium uppercase text-emerald-800">
                  Lead {leadResult.status}
                </p>
                <p className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-700">
                  {leadResult.whatsappMessage}
                </p>
                <a
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  href={leadResult.whatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open prepared WhatsApp message
                </a>
              </div>
            )}

          </div>
        </section>
      )}

      <button
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
        aria-label={isOpen ? 'Hide chat' : 'Open chat'}
      >
        <MessageCircle size={24} aria-hidden="true" />
      </button>
    </div>
  )
}

export default ChatbotWidget
