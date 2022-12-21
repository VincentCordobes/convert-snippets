const fs = require("fs");
const path = require("path");
const { parse } = require("../parse");

test("Format special placeholder", () => {
  // given
  const snippetStr = loadSnippet("special-placeholder");

  // when
  const snippets = parse(snippetStr);

  // then
  expect(snippets).toEqual({
    fun: {
      prefix: "fun",
      body: ["function ${1:name}(${2:params}) {", "\t$0", "}"],
    },
  });
});

test("Format multiple snippets", () => {
  // given
  const snippetStr = loadSnippet("simple");

  // when
  const snippets = parse(snippetStr);

  // then
  expect(snippets).toEqual({
    fun: {
      prefix: "fun",
      body: ["function ${1:name}(${2:params}) {", "\t$0", "}"],
      description: "function",
    },
    "c=>": {
      prefix: "c=>",
      body: ["const ${1:name} = (${2:params}) => {", "\t$0", "}"],
      description: "arrow function",
    },
  });
});

test("Format snippet with options (issue#2)", () => {
  // given
  const snippetStr = loadSnippet("with-options");

  // when
  const snippets = parse(snippetStr);

  // then
  expect(Object.keys(snippets)).toHaveLength(10);
});

test("Parse snippets with a multi-word prefix", () => {
  // given
  const snippetStr = loadSnippet("multi-word-prefix");
  // when
  const snippets = parse(snippetStr);
  // then
  expect(snippets).toEqual({
    "multi-word prefix": {
      prefix: "multi-word prefix",
      body: ["This is cool"],
    },
  });
});

function loadSnippet(name) {
  return fs.readFileSync(
    path.join(__dirname, `./fixtures/${name}.snippets`),
    "UTF-8"
  );
}
