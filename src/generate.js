const fs = require('fs')
const { parse } = require('./parse')

function generate(input, output) {
  const source = fs.readFileSync(input)
  const snippets = parse(source)
  fs.writeFileSync(output, JSON.stringify(snippets, null, 2))
}

module.exports = {
  generate,
}
