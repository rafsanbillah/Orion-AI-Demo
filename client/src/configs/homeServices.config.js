export const homeServicesConfig = {
  industryKey: 'home-services',
  brandName: 'FixFlow Services',
  tagline: 'Service requests, job details, and follow-up in one flow.',
  whatsappNumber: '+1 555 010 3000',
  chatbotWelcomeMessage:
    'Hi, welcome to FixFlow Services. Ask me about quotes, emergency help, service areas, or booking a visit.',
  heroTitle: 'Convert home service requests into scheduled jobs.',
  heroSubtitle:
    'A practical home services starter for repair requests, quote details, service areas, and WhatsApp job confirmation.',
  services: [
    'Plumbing repair requests',
    'Electrical troubleshooting',
    'Cleaning and maintenance bookings',
    'Emergency service callbacks',
  ],
  faqs: [
    {
      question: 'Can customers describe the job before booking?',
      answer:
        'Yes. The lead fields can collect service type, address, photos later, timing, and urgency.',
    },
    {
      question: 'Can technicians get job details through WhatsApp?',
      answer:
        'Yes. The message template can share the customer, service, location, and preferred time.',
    },
    {
      question: 'Can this work for different service categories?',
      answer:
        'Yes. Update the services and chatbot topics to match any local service business.',
    },
  ],
  chatbotTopics: [
    'Request a quote',
    'Emergency service',
    'Service areas',
    'Job status',
  ],
  leadCollectionFields: [
    { key: 'serviceType', label: 'service type' },
    { key: 'location', label: 'location' },
    { key: 'urgency', label: 'urgency' },
    { key: 'jobDetails', label: 'job details' },
    { key: 'name', label: 'name' },
    { key: 'phone', label: 'phone' },
  ],
  leadQualificationFields: [
    'Customer name',
    'Phone number',
    'Service needed',
    'Service address',
    'Preferred visit time',
    'Urgency level',
  ],
  whatsappMessageTemplate:
    'Hi FixFlow Services, I would like help with a home service request. Please follow up with me.',
}
