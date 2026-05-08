const { createCjsPreset } = require('jest-preset-angular/presets');

const ngPreset = createCjsPreset();

module.exports = {
  ...ngPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  coverageDirectory: '<rootDir>/coverage',
};
