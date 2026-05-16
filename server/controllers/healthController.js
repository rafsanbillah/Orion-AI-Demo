const { isMongoConnected } = require('../services/database')

function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'mern-mvp-api',
    database: isMongoConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
}

module.exports = {
  getHealth,
}
