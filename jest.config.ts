import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // transformIgnorePatterns: [
  //   '/node_modules/(?!(nuqs|lucide-react|@radix-ui|nanoid|uuid)/)',
  // ],
  // silent: true,
  testMatch: [
    "**/*.test.ts",
    "**/*.test.tsx",
  ]
}

export default createJestConfig(config)