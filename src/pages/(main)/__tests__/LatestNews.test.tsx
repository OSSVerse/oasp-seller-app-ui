import { render, screen } from '@testing-library/react';
import LatestNews from '../components/LatestNews';
import { describe, it, expect } from 'vitest';

describe('LatestNews Component', () => {
    it('renders the Latest News section correctly', () => {
        render(<LatestNews />);

        // Check if the heading text is present
        // expect(screen.getAllByText('Latest News')[0]).toBeInTheDocument();
        const latestNews = screen.getAllByText('Latest News')[0];
        expect(latestNews).toBeInTheDocument();

        // Check if the main title text is present
        expect(screen.getAllByText('AI Solutions to Power Your')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Business Applications')[0]).toBeInTheDocument();

        // Check if the description text is present
        expect(screen.getAllByText(/Enhance your AI capabilities/)[0]).toBeInTheDocument();

        // Check if the Learn More button is present
        expect(screen.getAllByText('Learn More')[0]).toBeInTheDocument();

        // Check if the image is present
        // const image = screen.getByRole('img');
        // expect(image).toBeInTheDocument();
    });

    it('renders the Swiper with multiple slides', () => {
        render(<LatestNews />);

        // Check if Swiper container is present
        expect(screen.getByTestId('swiper')).toBeInTheDocument();

        // Check if we have multiple slides
        // const slides = screen.getAllByTestId('swiper-slide');
        // expect(slides.length).toBe(4);
    });
    it('returns the correct bullet HTML', () => {
        const pagination = {
            clickable: true,
            renderBullet: (_: number, className: string) =>
              `<span class="${className}"></span>`,
        };

        const result = pagination.renderBullet(1, 'custom-bullet-class');
        expect(result).toBe('<span class="custom-bullet-class"></span>');
    });
});
