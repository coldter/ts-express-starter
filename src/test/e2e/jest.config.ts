import { resolve } from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import rootConfig from '../../../jest.config';

const rootDir = resolve(__dirname, '..', '..', '..');

const jestE2EConfig: JestConfigWithTsJest = {
  ...rootConfig,
  rootDir,
  displayName: 'E2E-Tests',
  testMatch: ['<rootDir>/src/test/e2e/**/*.spec.ts', '<rootDir>/src/test/e2e/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/e2e/jest.setup.ts', 'jest-extended/all'],
  testPathIgnorePatterns: [],
};

export default jestE2EConfig;
