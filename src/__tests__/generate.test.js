const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const { generate } = require('../generate')

beforeAll(initSandbox)

afterAll(cleanSandbox)

test('Should parse and output vscode snippet file', () => {
  // given
  const inputFile = path.join(__dirname, './fixtures/javascript.snippets')
  const outputFile = path.join(tmpPath, 'output.json')

  // when
  generate(inputFile, outputFile)

  // then
  fromJSON(outputFile).forEach(snippet =>
    expect(snippet).toEqual(
      expect.objectContaining({
        prefix: expect.any(String),
        body: expect.any(String),
      })
    )
  )
})

function fromJSON(path) {
  return Object.values(JSON.parse(fs.readFileSync(path)))
}

const tmpPath = path.join(__dirname, './_tmp')
function initSandbox() {
  const exists = fs.existsSync(tmpPath)
  if (exists) {
    cleanSandbox()
  }
  fs.mkdirSync(tmpPath)
}

function cleanSandbox() {
  rimraf.sync(tmpPath)
}
