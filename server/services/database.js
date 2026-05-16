const mongoose = require('mongoose')

function isMongoConnected() {
  return mongoose.connection.readyState === 1
}

async function connectDatabase(uri) {
  if (!uri) {
    console.warn('MONGO_URI is not set. Lead saving and dashboard data are disabled.')
    return false
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('MongoDB connected')
    return true
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    return false
  }
}

module.exports = {
  connectDatabase,
  isMongoConnected,
}
