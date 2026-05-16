export const realEstateConfig = {
  industryKey: 'real-estate',
  brandName: 'PrimeNest Realty',
  tagline: 'Capture better buyer, seller, and showing leads.',
  whatsappNumber: '+1 555 010 2000',
  chatbotWelcomeMessage:
    'Hi, welcome to PrimeNest Realty. Ask me about listings, showings, budgets, or selling your property.',
  heroTitle: 'Turn property interest into qualified real estate leads.',
  heroSubtitle:
    'A reusable real estate site starter for listing inquiries, buyer preferences, seller leads, and WhatsApp follow-up.',
  services: [
    'Buyer inquiry collection',
    'Seller valuation requests',
    'Property showing requests',
    'Rental availability questions',
  ],
  faqs: [
    {
      question: 'Can visitors ask about a specific property?',
      answer:
        'Yes. The lead fields can capture property type, budget, location, and preferred showing time.',
    },
    {
      question: 'Can agents receive leads through WhatsApp?',
      answer:
        'Yes. The template can summarize the lead and send it to an agent or team inbox.',
    },
    {
      question: 'Can this support buyer and seller funnels?',
      answer:
        'Yes. The config separates services and lead fields so both lead types can be represented.',
    },
  ],
  chatbotTopics: [
    'Available listings',
    'Schedule a showing',
    'Budget and financing',
    'Sell my property',
  ],
  leadCollectionFields: [
    { key: 'buyOrRent', label: 'buy or rent' },
    { key: 'propertyType', label: 'property type' },
    { key: 'preferredArea', label: 'preferred area' },
    { key: 'budget', label: 'budget' },
    { key: 'name', label: 'name' },
    { key: 'phone', label: 'phone' },
  ],
  leadQualificationFields: [
    'Lead name',
    'Phone number',
    'Buyer or seller',
    'Target location',
    'Budget range',
    'Preferred showing date',
  ],
  whatsappMessageTemplate:
    'Hi PrimeNest Realty, I would like help with a real estate request. Please follow up with me.',
}
