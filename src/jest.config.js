module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESModules: true,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!your-module-name)'],
};
