const { Parser } = require('json2csv')

function convertToCsv(rows, fields) {
  const parser = new Parser({ fields })
  return parser.parse(rows)
}

module.exports = {
  convertToCsv,
}
