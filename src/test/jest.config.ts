import { resolve } from 'path';
import rootConfig from '../../jest.config';
import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../../tsconfig.json';

const rootDir = resolve(__dirname, '..', '..');

const jestUnitConfig: JestConfigWithTsJest = {
  ...rootConfig,
  rootDir,
  moduleNameMapper: pathsToModuleNameMapper(
    { ...compilerOptions.paths, '@database/*': ['database/__mocks__/*'] },
    { prefix: '<rootDir>/src' },
  ),
};

export default jestUnitConfig;
