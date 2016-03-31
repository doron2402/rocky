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
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
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

