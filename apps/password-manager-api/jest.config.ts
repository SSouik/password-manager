/* eslint-disable */
export default {
    displayName: 'password-manager-api',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: '../../coverage/apps/password-manager-api',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: -1,
        },
    },
    coverageReporters: ['lcov', 'clover', 'json'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.config.ts', '!src/**/*.provider.ts'],
    coveragePathIgnorePatterns: ['index.ts', 'app.module.ts', 'main.ts'],
};
