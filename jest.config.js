module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
