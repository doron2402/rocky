'use stirct';

const gulpSettings = {};
gulpSettings.jsFiles = [
  'lib/**/*.js',
  'index.js'
];
gulpSettings.paths = {
  scripts: gulpSettings.jsFiles,
  tests: ['tests/**/*.spec.js'],
  coverage: 'coverage'
};

gulpSettings.coverageOptions = {
  thresholds: {
    global: {
      statements: 70,
      branches: 55,
      functions: 81,
      lines: 72
    }
  },
  coverageDirectory: gulpSettings.paths.coverage,
  rootDirectory: ''
};
gulpSettings.filesToChecks = [
  'lib/**/*.js',
  'index.js'
];
gulpSettings.testFiles = 'tests/**/*.js';
gulpSettings.testFilesPattern = '**/*spec.js';


module.exports = {
  gulpSettings
};

