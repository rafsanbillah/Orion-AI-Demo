const fallbackMessage =
  'I can help connect you with the team on WhatsApp for the most accurate answer.'

const industryFaqs = {
  clinic: [
    {
      question: 'Can patients request same-day appointments?',
      answer:
        'Yes. Patients can request same-day appointments, and the clinic team can confirm availability by WhatsApp or phone.',
    },
    {
      question: 'Can staff follow up through WhatsApp?',
      answer:
        'Yes. Staff can use WhatsApp to confirm appointments, collect missing details, and share next steps.',
    },
    {
      question: 'Do you answer insurance questions?',
      answer:
        'The chatbot can collect basic insurance questions and pass them to the clinic team for confirmation.',
    },
  ],
  'real-estate': [
    {
      question: 'Can visitors ask about a specific property?',
      answer:
        'Yes. Visitors can share the property type, preferred area, budget, and showing time so an agent can follow up.',
    },
    {
      question: 'Can agents receive leads through WhatsApp?',
      answer:
        'Yes. Buyer, renter, and seller leads can be summarized into a WhatsApp message for the agent.',
    },
    {
      question: 'Can I share my budget?',
      answer:
        'Yes. The lead flow can collect budget, preferred area, and whether the visitor wants to buy or rent.',
    },
  ],
  'home-services': [
    {
      question: 'Can customers describe the job before booking?',
      answer:
        'Yes. Customers can share the service type, location, urgency, and job details before the team follows up.',
    },
    {
      question: 'Can technicians get job details through WhatsApp?',
      answer:
        'Yes. The collected job details can be prepared as a WhatsApp message for the service team.',
    },
    {
      question: 'Do you handle emergency service?',
      answer:
        'The chatbot can collect urgency and location, then connect the customer with the team for the fastest response.',
    },
  ],
}

const industryAliases = {
  clinic: 'clinic',
  healthcare: 'clinic',
  medical: 'clinic',
  realEstate: 'real-estate',
  'real-estate': 'real-estate',
  real_estate: 'real-estate',
  property: 'real-estate',
  homeServices: 'home-services',
  'home-services': 'home-services',
  home_services: 'home-services',
  services: 'home-services',
}

const ignoredWords = new Set([
  'about',
  'after',
  'answer',
  'can',
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
  'you',
  'your',
])

function normalizeIndustry(industry) {
  const rawIndustry = String(industry || '')
  const lowercaseIndustry = rawIndustry.toLowerCase()
  const slugIndustry = lowercaseIndustry.replace(/[\s_]+/g, '-')

  return (
    industryAliases[rawIndustry] ||
    industryAliases[lowercaseIndustry] ||
    industryAliases[slugIndustry]
  )
}

function getKeywords(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !ignoredWords.has(word))
}

function findFaqAnswer(message, faqs = []) {
  const messageKeywords = getKeywords(message)

  if (messageKeywords.length === 0) {
    return null
  }

  let bestAnswer = null
  let bestScore = 0

  faqs.forEach((faq) => {
    const faqKeywords = getKeywords(`${faq.question} ${faq.answer}`)
    const score = messageKeywords.filter((word) => faqKeywords.includes(word)).length

    if (score > bestScore) {
      bestScore = score
      bestAnswer = faq.answer
    }
  })

  return bestScore > 0 ? bestAnswer : null
}

function getChatStatus(req, res) {
  res.json({
    industries: Object.keys(industryFaqs),
    message: 'Mock chat route is ready',
  })
}

function sendChatMessage(req, res) {
  const { industry, message } = req.body

  if (!industry || !message) {
    return res.status(400).json({
      message: 'Industry and message are required',
    })
  }

  const industryKey = normalizeIndustry(industry)

  if (!industryKey) {
    return res.status(400).json({
      message: 'Unknown industry',
    })
  }

  const reply = findFaqAnswer(message, industryFaqs[industryKey]) || fallbackMessage

  // Later, this is where an OpenAI call could be added.
  // For now, the MVP intentionally uses only simple mock FAQ matching.
  return res.json({
    industry: industryKey,
    reply,
    source: reply === fallbackMessage ? 'fallback' : 'mock-faq',
  })
}

module.exports = {
  getChatStatus,
  sendChatMessage,
}
