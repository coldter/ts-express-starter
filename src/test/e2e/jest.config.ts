import { resolve } from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import rootConfig from '../../../jest.config';

const rootDir = resolve(__dirname, '..', '..', '..');

const jestConfig: JestConfigWithTsJest = {
  ...rootConfig,
  rootDir,
  displayName: 'E2E Tests',
  testMatch: ['<rootDir>/src/test/e2e/**/*.spec.ts', '<rootDir>/src/test/e2e/**/*.test.ts'],
};

console.log(jestConfig);
export default jestConfig;
