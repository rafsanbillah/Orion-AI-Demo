const mongoose = require('mongoose')
const { Parser } = require('json2csv')
const Lead = require('../models/Lead')
const { isMongoConnected } = require('../services/database')

const { allowedStatuses } = Lead

function normalizeKey(key) {
  return String(key || '').replace(/[^a-z0-9]/gi, '').toLowerCase()
}

function getLeadValue(body, qualificationData, keys) {
  const bodyEntries = Object.entries(body)
  const qualificationEntries = Object.entries(qualificationData)
  const possibleKeys = keys.map(normalizeKey)
  const match =
    bodyEntries.find(([key, value]) => value && possibleKeys.includes(normalizeKey(key))) ||
    qualificationEntries.find(
      ([key, value]) => value && possibleKeys.includes(normalizeKey(key)),
    )

  return match ? match[1] : ''
}

function normalizeLeadPayload(body) {
  const qualificationData = body.qualificationData || body.fields || {}

  return {
    industry: body.industry || body.industryKey || '',
    sourceProject: body.sourceProject || body.brandName || 'MERN MVP',
    sourcePage: body.sourcePage || 'website',
    sourceType: body.sourceType || body.source || 'chatbot',
    name: getLeadValue(body, qualificationData, [
      'name',
      'leadName',
      'customerName',
      'patientName',
    ]),
    phone: getLeadValue(body, qualificationData, ['phone', 'phoneNumber']),
    email: getLeadValue(body, qualificationData, ['email']),
    inquiryType: getLeadValue(body, qualificationData, [
      'inquiryType',
      'serviceType',
      'serviceNeeded',
      'reasonForVisit',
      'leadType',
      'buyerOrSeller',
      'buyOrRent',
    ]),
    message: body.message || body.whatsappMessage || '',
    qualificationData,
    status: body.status || 'New',
    notes: body.notes || '',
  }
}

function validateStatus(status) {
  return allowedStatuses.includes(status)
}

async function createLead(req, res, next) {
  try {
    const leadData = normalizeLeadPayload(req.body)

    if (!leadData.industry) {
      return res.status(400).json({
        message: 'Industry is required',
      })
    }

    if (!validateStatus(leadData.status)) {
      return res.status(400).json({
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      })
    }

    if (!isMongoConnected()) {
      return res.status(503).json({
        message: 'MongoDB is not connected. Set MONGO_URI before saving leads.',
      })
    }

    const lead = await Lead.create(leadData)

    return res.status(201).json({
      message: 'Lead saved',
      lead,
    })
  } catch (error) {
    return next(error)
  }
}

async function getLeads(req, res, next) {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({
        message: 'MongoDB is not connected. Set MONGO_URI before reading leads.',
      })
    }

    const leads = await Lead.find().sort({ createdAt: -1 })

    return res.json({
      leads,
    })
  } catch (error) {
    return next(error)
  }
}

async function exportLeads(req, res, next) {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({
        message: 'MongoDB is not connected. Set MONGO_URI before exporting leads.',
      })
    }

    const leads = await Lead.find().sort({ createdAt: -1 }).lean()
    const csvRows = leads.map((lead) => ({
      ...lead,
      _id: lead._id.toString(),
      qualificationData: JSON.stringify(lead.qualificationData || {}),
    }))
    const parser = new Parser({
      fields: [
        '_id',
        'industry',
        'sourceProject',
        'sourcePage',
        'sourceType',
        'name',
        'phone',
        'email',
        'inquiryType',
        'message',
        'qualificationData',
        'status',
        'notes',
        'createdAt',
      ],
    })
    const csv = parser.parse(csvRows)

    res.header('Content-Type', 'text/csv')
    res.attachment('leads.csv')

    return res.send(csv)
  } catch (error) {
    return next(error)
  }
}

async function updateLead(req, res, next) {
  try {
    const { id } = req.params
    const { status, notes } = req.body
    const updates = {}

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid lead id',
      })
    }

    if (status) {
      if (!validateStatus(status)) {
        return res.status(400).json({
          message: `Status must be one of: ${allowedStatuses.join(', ')}`,
        })
      }

      updates.status = status
    }

    if (notes !== undefined) {
      updates.notes = notes
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'Status or notes is required',
      })
    }

    if (!isMongoConnected()) {
      return res.status(503).json({
        message: 'MongoDB is not connected. Set MONGO_URI before updating leads.',
      })
    }

    const lead = await Lead.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    return res.json({
      message: 'Lead updated',
      lead,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createLead,
  exportLeads,
  getLeads,
  updateLead,
}
