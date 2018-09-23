module.exports = {
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js'],
  collectCoverageFrom: ['src/**/*.js', '!src/cli.js'],
  coverageReporters: ['lcov', 'text-summary'],
}
