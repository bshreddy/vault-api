module.exports = {
    setupFiles: ['<rootDir>/tests/setup/env.ts'],
    globalSetup: '<rootDir>/tests/setup/global-setup.ts',
    globalTeardown: '<rootDir>/tests/setup/global-teardown.ts',
    roots: [
        '<rootDir>/tests'
    ],
    testMatch: [
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleDirectories: ['node_modules', 'dist', 'lib'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coveragePathIgnorePatterns: [
        'node_modules',
        'dist',
        'tests',
        'lib/utils'
    ],
};
