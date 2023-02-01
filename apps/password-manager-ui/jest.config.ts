/* eslint-disable */
export default {
    displayName: 'password-manager-ui',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
    coverageDirectory: '../../coverage/apps/password-manager-ui',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
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
    coveragePathIgnorePatterns: [
        'main.ts',
        'polyfills.ts',
        'test-setup.ts',
        'app.module.ts',
        'index.ts',
        'environment.ts',
        'environment.*.ts',
    ],
};
