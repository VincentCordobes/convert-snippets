const fs = require('fs')
const {parse} = require('./parse')

function generate(input, output) {
	const source = fs.readFileSync(input)

	const isUltisnips = /.snippets$/.test(input)
	if (isUltisnips) {
		const json = ultisnipsToJSON(source)
		fs.writeFileSync(output, json)
	} else {
		const ultisnips = jsonToUltisnips(source)
		fs.writeFileSync(output, ultisnips)
	}
}

function ultisnipsToJSON(ultisnips) {
	const snippets = parse(ultisnips)
	return JSON.stringify(snippets, null, 2)
}

function jsonToUltisnips(json) {
	const snippets = Object.values(JSON.parse(json, (key, value) => {
		if (key === 'body') {
			let retour = ''
			if (Array.isArray(value)) {
				value.forEach((e) => {
					retour += e + '\n'
				})
				return retour
			}
		}
		return value;
	}))
	return snippets.map(toUltisnips).join('\n')
}

function toUltisnips(snippet) {
	// prettier-ignore
	return `
snippet ${snippet.prefix} ${snippet.description ? `"${snippet.description}"` : ''}
${snippet.body}
endsnippet`
}

module.exports = {
	generate,
	ultisnipsToJSON,
	jsonToUltisnips,
}
