require('dotenv').config()

const cors = require('cors')
const express = require('express')
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')
const healthRoutes = require('./routes/healthRoutes')
const leadRoutes = require('./routes/leadRoutes')
const { errorHandler, notFound } = require('./middleware/errorHandler')
const { connectDatabase } = require('./services/database')

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'MERN MVP API is running',
  })
})

app.use('/api/health', healthRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/auth', authRoutes)

app.use(notFound)
app.use(errorHandler)

async function startServer() {
  await connectDatabase(process.env.MONGO_URI)

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

startServer()
