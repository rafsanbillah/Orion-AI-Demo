const express = require('express')
const { getChatStatus, sendChatMessage } = require('../controllers/chatController')

const router = express.Router()

router.get('/', getChatStatus)
router.post('/', sendChatMessage)

module.exports = router
