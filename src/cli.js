#!/usr/bin/env node

const { generate } = require('./generate')
const logger = require('./logger')

cli()

function cli() {
  const usage = 'Usage: convert-snippet source_file target_file'
  const sourceFile = process.argv[2]
  const targetFile = process.argv[3]

  const missingArgs = !sourceFile || !targetFile
  if (['--help', '-h'].includes(sourceFile) || missingArgs) {
    console.log(usage)
    process.exit()
  }

  generate(sourceFile, targetFile)
  logger.info('✨ Done')
}
