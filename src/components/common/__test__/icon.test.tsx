import { render } from '@testing-library/react';
import { Icon } from '../icon';
import { describe, it, expect } from 'vitest';
describe('Icon Component', () => {
    it('renders the correct icon based on the icon prop', () => {
        const { container } = render(<Icon icon="search-alt" />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies the correct size class based on the size prop', () => {
        const { container: smallContainer } = render(<Icon icon="search-alt" size="small" />);
        expect(smallContainer.querySelector('svg')).toHaveClass('w-4 h-4');

        const { container: normalContainer } = render(<Icon icon="search-alt" size="normal" />);
        expect(normalContainer.querySelector('svg')).toHaveClass('w-5 h-5');

        const { container: mediumContainer } = render(<Icon icon="search-alt" size="medium" />);
        expect(mediumContainer.querySelector('svg')).toHaveClass('w-6 h-6');

        const { container: largeContainer } = render(<Icon icon="search-alt" size="large" />);
        expect(largeContainer.querySelector('svg')).toHaveClass('w-8 h-8');
    });

    it('applies additional class names passed via className prop', () => {
        const { container } = render(<Icon icon="search-alt" className="custom-class" />);
        expect(container.querySelector('svg')).toHaveClass('custom-class');
    });

    it('renders the default icon if an unknown icon prop is provided', () => {
        const { container } = render(<Icon icon="unknown-icon" />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
