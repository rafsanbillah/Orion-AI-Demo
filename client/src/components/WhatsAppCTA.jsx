import { MessageCircle } from 'lucide-react'
import { generateWhatsAppLink } from '../utils/whatsapp.js'

function WhatsAppCTA({ config }) {
  const whatsappLink = generateWhatsAppLink(
    config.whatsappNumber,
    {
      intro: config.whatsappMessageTemplate,
    },
    config,
  )

  return (
    <section className="grid gap-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6 md:grid-cols-[1fr_auto] md:items-center">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-emerald-700">
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp CTA
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          Follow up with {config.brandName} on WhatsApp.
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-700">
          {config.whatsappMessageTemplate}
        </p>
      </div>

      <a
        className="inline-flex justify-center rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        href={whatsappLink}
        rel="noreferrer"
        target="_blank"
      >
        {config.whatsappNumber}
      </a>
    </section>
  )
}

export default WhatsAppCTA
