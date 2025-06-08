import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure testing-library
configure({
    testIdAttribute: 'data-testid',
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => '/en-GB',
})) 