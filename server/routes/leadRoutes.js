const express = require('express')
const {
  createLead,
  exportLeads,
  getLeads,
  updateLead,
} = require('../controllers/leadController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', requireAuth, getLeads)
router.get('/export', requireAuth, exportLeads)
router.post('/', createLead)
router.patch('/:id', requireAuth, updateLead)

module.exports = router
