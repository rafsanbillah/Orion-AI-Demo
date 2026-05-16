const mongoose = require('mongoose')

const allowedStatuses = ['New', 'Contacted', 'Qualified', 'Closed']

const leadSchema = new mongoose.Schema({
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  sourceProject: {
    type: String,
    default: 'MERN MVP',
    trim: true,
  },
  sourcePage: {
    type: String,
    default: 'website',
    trim: true,
  },
  sourceType: {
    type: String,
    default: 'chatbot',
    trim: true,
  },
  name: {
    type: String,
    default: '',
    trim: true,
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  email: {
    type: String,
    default: '',
    trim: true,
    lowercase: true,
  },
  inquiryType: {
    type: String,
    default: '',
    trim: true,
  },
  message: {
    type: String,
    default: '',
    trim: true,
  },
  qualificationData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  status: {
    type: String,
    enum: allowedStatuses,
    default: 'New',
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Lead', leadSchema)
module.exports.allowedStatuses = allowedStatuses
