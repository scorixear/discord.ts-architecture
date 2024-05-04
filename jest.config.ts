module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./tests/helpers/'],
  coveragePathIgnorePatterns: ['./tests/helpers/'],
  modulePathIgnorePatterns: ['./tests/helpers/']
};
