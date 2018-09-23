module.exports = {
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/cli.js'],
  coverageReporters: ['lcov', 'text-summary'],
}
