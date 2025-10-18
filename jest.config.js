module.exports = {
  // preset: 'jest-expo',
  preset: 'react-native',
  // setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/babel.config.js'],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],

  collectCoverage: true,
  collectCoverageFrom: ["screens/**/*.js"],
  coverageReporters: ["lcov", "text-summary"]
};
