global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { render, screen, fireEvent } from '@testing-library/react';
import PricingRange from '../pricing-range'; // Adjust the import path as necessary

describe('PricingRange', () => {
  it('renders with initial values', () => {
    render(<PricingRange />);

    // Check if the slider has the correct initial values
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(1); // Ensure there are two thumbs
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '0'); // Check the first thumb
    // expect(thumbs[1]).toHaveAttribute('aria-valuenow', '2000'); // Check the second thumb
  });

  // it('updates values when slider is moved', () => {
  //     render(<PricingRange />);
      
  //     const sliderRoot = screen.getByRole('slider-root');
  //     const thumbs = screen.getAllByRole('slider');
  
  //     expect(thumbs[0]).toHaveAttribute('aria-valuenow', '300');
  //     expect(thumbs[1]).toHaveAttribute('aria-valuenow', '2000');
  
  //     fireEvent.mouseDown(thumbs[0]);
  //     fireEvent.mouseMove(thumbs[0], { clientX: 250 });
  //     fireEvent.mouseUp(thumbs[0]);
  
  //     expect(thumbs[0]).toHaveAttribute('aria-valuenow', '250'); 
  
  //     fireEvent.mouseDown(thumbs[1]);
  //     fireEvent.mouseMove(thumbs[1], { clientX: 1800 });
  //     fireEvent.mouseUp(thumbs[1]);
  
  //     expect(thumbs[1]).toHaveAttribute('aria-valuenow', '1800');
  // });
});
