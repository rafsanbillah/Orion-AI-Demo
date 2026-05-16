import { useLocation } from 'react-router-dom'
import ChatbotWidget from '../components/ChatbotWidget.jsx'
import ContactForm from '../components/ContactForm.jsx'
import FAQSection from '../components/FAQSection.jsx'
import Hero from '../components/Hero.jsx'
import ServiceCards from '../components/ServiceCards.jsx'
import WhatsAppCTA from '../components/WhatsAppCTA.jsx'
import { getIndustryConfig } from '../utils/getIndustryConfig.js'

function IndustrySite() {
  const location = useLocation()
  const config = getIndustryConfig(location.pathname)

  if (!config) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-950">Industry not found</h1>
        <p className="mt-3 text-slate-600">Choose one of the industry pages from the navbar.</p>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <Hero config={config} />
      <ServiceCards services={config.services} />
      <FAQSection faqs={config.faqs} />
      <ContactForm config={config} />
      <WhatsAppCTA config={config} />
      <ChatbotWidget config={config} key={config.industryKey} />
    </div>
  )
}

export default IndustrySite
