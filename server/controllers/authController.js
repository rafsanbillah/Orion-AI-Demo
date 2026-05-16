const jwt = require('jsonwebtoken')

function getJwtSecret() {
  return process.env.JWT_SECRET || 'your_secret'
}

function createToken(user) {
  return jwt.sign(user, getJwtSecret(), {
    expiresIn: '7d',
  })
}

function loginUser(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    })
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  const user = {
    id: 'admin',
    name: 'Admin',
    email,
    role: 'admin',
  }

  return res.json({
    message: 'Login successful',
    user,
    token: createToken(user),
  })
}

module.exports = {
  loginUser,
}
