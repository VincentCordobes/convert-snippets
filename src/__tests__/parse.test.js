const fs = require('fs')
const path = require('path')
const { parse } = require('../parse')

test('Format special placeholder', () => {
  // given
  const snippetStr = loadSnippet('special-placeholder')

  // when
  const snippets = parse(snippetStr)

  // then
  expect(snippets).toEqual({
    fun: {
      prefix: 'fun',
      body: 'function ${1:name}(${2:params}) {\n\t$0\n}',
    },
  })
})

test('Format multiple snippets', () => {
  // given
  const snippetStr = loadSnippet('simple')

  // when
  const snippets = parse(snippetStr)

  // then
  expect(snippets).toEqual({
    fun: {
      prefix: 'fun',
      body: 'function ${1:name}(${2:params}) {\n\t$0\n}',
      description: 'function',
    },
    'c=>': {
      prefix: 'c=>',
      body: 'const ${1:name} = (${2:params}) => {\n\t$0\n}',
      description: 'arrow function',
    },
  })
})

test('Format snippet with options (issue#2)', () => {
  // given
  const snippetStr = loadSnippet('with-options')

  // when
  const snippets = parse(snippetStr)

  // then
  expect(Object.keys(snippets)).toHaveLength(10)
})

function loadSnippet(name) {
  return fs.readFileSync(
    path.join(__dirname, `./fixtures/${name}.snippets`),
    'UTF-8'
  )
}
