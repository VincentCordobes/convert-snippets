function warn(message) {
  console.warn('\x1b[33m%s\x1b[0m: %s', 'warn', message)
}

function info(message) {
  console.info(message)
}

module.exports = {
  warn,
  info,
}
