import { useState } from 'react'
import {
  createReadableWhatsAppMessage,
  generateWhatsAppLink,
} from '../utils/whatsapp.js'
import { API_BASE_URL } from '../configs/api.js'

function fieldType(field) {
  const normalizedField = field.toLowerCase()

  if (normalizedField.includes('phone')) {
    return 'tel'
  }

  if (normalizedField.includes('date')) {
    return 'date'
  }

  if (normalizedField.includes('time')) {
    return 'text'
  }

  return 'text'
}

function ContactForm({ config }) {
  const [whatsappLead, setWhatsappLead] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setStatusMessage('')
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const fields = Object.fromEntries(formData.entries())
      const messageData = { fields }
      const message = createReadableWhatsAppMessage(messageData, config)
      const url = generateWhatsAppLink(config.whatsappNumber, messageData, config)

      setWhatsappLead({
        message,
        url,
      })

      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industryKey: config.industryKey,
          brandName: config.brandName,
          source: 'contact-form',
          fields,
          whatsappMessage: message,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not save your request yet.')
      }

      event.currentTarget.reset()
      setStatusMessage('Request saved. You can also send the WhatsApp message below.')
    } catch (error) {
      setStatusMessage(
        `${error.message} Your WhatsApp message is still ready below.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:p-8"
      id="contact"
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-emerald-700">Contact</p>
        <h2 className="text-2xl font-bold text-slate-950">Send a qualified request</h2>
        <p className="text-sm leading-6 text-slate-600">
          This beginner-friendly form uses the lead fields from the active industry
          config, saves the request to the API, and prepares a WhatsApp follow-up.
        </p>
      </div>

      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        {config.leadQualificationFields.map((field) => (
          <label className="block text-sm font-medium text-slate-700" key={field}>
            {field}
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              name={field.toLowerCase().replaceAll(' ', '-')}
              placeholder={`Enter ${field.toLowerCase()}`}
              type={fieldType(field)}
            />
          </label>
        ))}

        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Notes
          <textarea
            className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            name="notes"
            placeholder={`Tell ${config.brandName} anything else they should know`}
          />
        </label>

        <button
          className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:col-span-2"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Sending...' : 'Submit request'}
        </button>

        {statusMessage && (
          <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 sm:col-span-2">
            {statusMessage}
          </p>
        )}

        {whatsappLead && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 sm:col-span-2">
            <p className="text-sm font-semibold text-emerald-800">
              WhatsApp message ready
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
              {whatsappLead.message}
            </p>
            <a
              className="mt-4 inline-flex w-full justify-center rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              href={whatsappLead.url}
              rel="noreferrer"
              target="_blank"
            >
              Open WhatsApp message
            </a>
          </div>
        )}
      </form>
    </section>
  )
}

export default ContactForm
