import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'babel-jest',
    },
    moduleNameMapper: {
        '@types': '<rootDir>/src/types/',
        '@lib': '<rootDir>/src/shared/lib/',
        '@entities': '<rootDir>/src/entities/',
        '@ui': '<rootDir>/src/shared/ui/',
    },
    collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts'],
};
export default config;
