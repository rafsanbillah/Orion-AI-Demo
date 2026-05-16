export const clinicConfig = {
  industryKey: 'clinic',
  brandName: 'CareBridge Clinic',
  tagline: 'Patient booking and follow-up made simple.',
  whatsappNumber: '+1 555 010 1000',
  chatbotWelcomeMessage:
    'Hi, welcome to CareBridge Clinic. Ask me about appointments, doctor availability, insurance, or follow-up options.',
  heroTitle: 'Book appointments and qualify patient requests faster.',
  heroSubtitle:
    'A starter clinic site for appointment requests, patient questions, service details, and WhatsApp follow-up.',
  services: [
    'General consultation booking',
    'Dental and specialist appointment requests',
    'Prescription refill questions',
    'Lab report follow-up',
  ],
  faqs: [
    {
      question: 'Can patients request same-day appointments?',
      answer:
        'Yes. The intake flow can collect urgency, symptoms, preferred time, and contact details.',
    },
    {
      question: 'Can staff follow up through WhatsApp?',
      answer:
        'Yes. Leads can be routed into a WhatsApp message template for quick confirmation.',
    },
    {
      question: 'Is this ready for medical records?',
      answer:
        'This starter is for intake and scheduling. Add compliance review before storing sensitive records.',
    },
  ],
  chatbotTopics: [
    'Opening hours',
    'Appointment booking',
    'Doctor availability',
    'Insurance questions',
  ],
  leadCollectionFields: [
    { key: 'serviceNeeded', label: 'service needed' },
    { key: 'preferredTime', label: 'preferred time' },
    { key: 'name', label: 'name' },
    { key: 'phone', label: 'phone' },
  ],
  leadQualificationFields: [
    'Patient name',
    'Phone number',
    'Preferred appointment date',
    'Reason for visit',
    'Urgency level',
  ],
  whatsappMessageTemplate:
    'Hi CareBridge Clinic, I would like help with an appointment request. Please follow up with me.',
}
