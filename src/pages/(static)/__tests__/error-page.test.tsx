import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useRouteError, useSearchParams } from 'react-router-dom';
import ErrorPage from '../error-page';

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useRouteError: vi.fn(),
        useSearchParams: vi.fn(),
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        isRouteErrorResponse: (error: any) => error?.status !== undefined,
    };
});

// Helper function to render ErrorPage with router
const renderErrorPage = () => {
    return render(
        <BrowserRouter>
            <ErrorPage />
        </BrowserRouter>
    );
};

describe('ErrorPage', () => {
    beforeEach(() => {
        // Reset mock implementations before each test
        vi.mocked(useSearchParams).mockImplementation(() => [new URLSearchParams(), vi.fn()]);
    });

    it('renders 404 error page correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({ status: 404 });

        renderErrorPage();

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page not found')).toBeInTheDocument();
        expect(screen.getByText("Sorry, we couldn't find the page you're looking for.")).toBeInTheDocument();
    });

    it('renders 401 unauthorized error page correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({ status: 401 });

        renderErrorPage();

        expect(screen.getByText('401')).toBeInTheDocument();
        expect(screen.getByText('Unauthorized')).toBeInTheDocument();
        expect(screen.getByText("You aren't authorized to see this")).toBeInTheDocument();
    });

    it('renders 503 service unavailable error page correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({ status: 503 });

        renderErrorPage();

        expect(screen.getByText('503')).toBeInTheDocument();
        expect(screen.getByText('Service unavailable')).toBeInTheDocument();
        expect(screen.getByText('Looks like our API is down')).toBeInTheDocument();
    });

    it('renders 418 teapot error page correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({ status: 418 });

        renderErrorPage();

        expect(screen.getByText('418')).toBeInTheDocument();
        expect(screen.getAllByText("I'm a teapot")[0]).toBeInTheDocument();
    });

    it('renders generic error page with custom error message from URL params', () => {
        vi.mocked(useRouteError).mockReturnValue({});
        vi.mocked(useSearchParams).mockImplementation(() => [
            new URLSearchParams('?error=Custom error message'),
            vi.fn(),
        ]);

        renderErrorPage();

        expect(screen.getByText('500')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });

    it('renders generic error page with default message when no error param', () => {
        vi.mocked(useRouteError).mockReturnValue({});

        renderErrorPage();

        expect(screen.getByText('500')).toBeInTheDocument();
        expect(screen.getAllByText('Something went wrong')[0]).toBeInTheDocument();
    });

    it('renders navigation buttons correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({ status: 404 });

        renderErrorPage();

        expect(screen.getByText('Go back home')).toBeInTheDocument();
        expect(screen.getByText('Contact support')).toBeInTheDocument();
    });
});
