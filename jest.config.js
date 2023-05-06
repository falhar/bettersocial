module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'config', 'models/index.js', 'index.js', 'config.js'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
