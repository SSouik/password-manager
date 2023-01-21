/* eslint-disable */
export default {
    displayName: 'password-manager-config',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/libs/password-manager-config',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: -1,
        },
    },
    coverageReporters: ['lcov', 'clover', 'json'],
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['index.ts'],
};
