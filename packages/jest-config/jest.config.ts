import type { Config } from 'jest';

const BaseConfig: Config = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  verbose: true,
  // Module file extensions for importing
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  snapshotResolver: '<rootDir>/__snapshots__/snapshotResolver.ts',
};

export default BaseConfig;
