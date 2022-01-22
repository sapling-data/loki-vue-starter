module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/*.{js,vue}',
    '!**/node_modules/**',
  ],
  coverageReporters: [
    'html',
    'text-summary',
  ],
};
