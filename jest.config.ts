import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: false,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    'react-markdown': '<rootDir>/src/__mocks_/react-markdown.js',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!react-markdown/)'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
}
export default config
