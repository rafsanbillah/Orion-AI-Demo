function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

function errorHandler(error, req, res, next) {
  if (error instanceof SyntaxError && error.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'Invalid JSON request body',
    })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: error.message,
    })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid id',
    })
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  return res.status(statusCode).json({
    message: error.message || 'Server error',
  })
}

module.exports = {
  errorHandler,
  notFound,
}
