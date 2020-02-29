const VIM_SNIPPET = /^snippet (?:"([\w\s-]+)"|([^\s]+))\s*(?:"(.*?)".*)?\n((?:.|\n)*?)\nendsnippet$/gm

function parse(rawSnippets) {
  let res
  let snippets = {}
  while ((res = VIM_SNIPPET.exec(rawSnippets)) !== null) {
    //eslint-disable-next-line no-unused-vars
    const [_, multiWordPrefix, singleWordPrefix, description, body] = res
    const prefix = multiWordPrefix || singleWordPrefix
    snippets[prefix] = {
      prefix,
      body: normalizePlaceholders(body),
    }
    if (description) {
      snippets[prefix].description = description
    }
  }
  return snippets
}

function normalizePlaceholders(str) {
  const visualPlaceholder = /\${(\d):\${VISUAL}}/
  if (visualPlaceholder.test(str)) {
    const n = visualPlaceholder.exec(str)[1]
    return str.replace(visualPlaceholder, `$${n}`)
  } else {
    return str
  }
}

module.exports = {
  parse,
}
