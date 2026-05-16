function cleanPhoneNumber(phoneNumber) {
  return String(phoneNumber || '').replace(/\D/g, '')
}

function humanizeKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .trim()
    .toLowerCase()
}

function normalizeKey(key) {
  return String(key || '').replace(/[^a-z0-9]/gi, '').toLowerCase()
}

function getFieldLabel(fieldKey, config) {
  const allFields = [
    ...(config?.leadCollectionFields || []),
    ...(config?.leadQualificationFields || []).map((field) => ({
      key: field.toLowerCase().replaceAll(' ', '-'),
      label: field,
    })),
  ]

  return allFields.find((field) => field.key === fieldKey)?.label || humanizeKey(fieldKey)
}

function fillTemplate(template, fields) {
  if (!template) {
    return ''
  }

  const normalizedFields = Object.entries(fields).reduce((result, [key, value]) => {
    result[normalizeKey(key)] = value
    return result
  }, {})

  return template.replace(/{{\s*([^}]+)\s*}}/g, (match, fieldName) => {
    const value = normalizedFields[normalizeKey(fieldName)]

    return value || ''
  })
}

export function createReadableWhatsAppMessage(messageData = {}, config = {}) {
  const fields = messageData.fields || messageData
  const intro =
    fillTemplate(messageData.intro || config.whatsappMessageTemplate, fields) ||
    `Hi ${config.brandName || 'there'}, I would like help with a new request.`

  const lines = Object.entries(fields)
    .filter(([key, value]) => value && !['intro', 'source', 'fields'].includes(key))
    .map(([key, value]) => `${getFieldLabel(key, config)}: ${value}`)

  return [intro, ...lines].join('\n')
}

export function generateWhatsAppLink(phoneNumber, messageData = {}, config = {}) {
  const cleanNumber = cleanPhoneNumber(phoneNumber)
  const message = createReadableWhatsAppMessage(messageData, config)

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
}
