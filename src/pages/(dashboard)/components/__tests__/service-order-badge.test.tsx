import { render, screen } from '@testing-library/react';
import ServiceOrderBadge from '../service-order-badge';
import { Item } from '@/services/orders-service'; // Adjust the import path as necessary

describe('ServiceOrderBadge', () => {
  it('renders the badge with the correct text', () => {
    const mockServiceOrder: Item = {
      productSubcategory1: 'Test Product Subcategory',
      // Add other required properties here based on your Item interface
    };

    render(<ServiceOrderBadge serviceOrder={mockServiceOrder} />);

    // Check if the badge is in the document and has the correct text
    const badge = screen.getByText('Test Product Subcategory');
    expect(badge).toBeInTheDocument();
  });

  it('applies the correct classes for the secondary variant', () => {
    const mockServiceOrder: Item = {
      productSubcategory1: 'Test Product Subcategory',
      // Add other required properties here based on your Item interface
    };

    const { container } = render(<ServiceOrderBadge serviceOrder={mockServiceOrder} />);
    
    // Check if the badge has the expected class for the secondary variant
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-secondary text-secondary-foreground hover:bg-secondary/80');
  });
});
