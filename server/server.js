require('dotenv').config()

const cors = require('cors')
const express = require('express')
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')
const healthRoutes = require('./routes/healthRoutes')
const leadRoutes = require('./routes/leadRoutes')
const { errorHandler, notFound } = require('./middleware/errorHandler')
const { connectDatabase } = require('./services/database')

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked request from ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.json({
      message: 'MERN MVP API is running',
    })
  })
}

app.use('/api/health', healthRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '..', 'client', 'dist')

  app.use(express.static(clientDistPath))

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

async function startServer() {
  await connectDatabase(process.env.MONGO_URI)

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

startServer()
