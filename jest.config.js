const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
        '/node_modules/(?!(next-intl|@formatjs)/)',
    ],
};

module.exports = createJestConfig(customJestConfig); 