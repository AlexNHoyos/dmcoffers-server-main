/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['reflect-metadata', './jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^(\\.\\.?/.*)\\.js$': '$1',
  },
  testMatch: ['**/?(*.)+(spec|test).ts'],
  clearMocks: true,
  globals: {
    'NODE_ENV': 'test',
  },
};