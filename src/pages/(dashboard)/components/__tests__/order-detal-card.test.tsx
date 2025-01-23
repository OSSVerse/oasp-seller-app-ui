import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OrderDetailCard from '../order-detal-card';
import type { Daum } from '@/services/orders-service';
import { vi } from 'vitest';

vi.mock('./service-order-badge', () => ({
  __esModule: true,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  default: ({ serviceOrder }: { serviceOrder: any }) => (
    <div data-testid="service-order-badge">{serviceOrder.productSubcategory1}</div>
  ),
}));

describe('OrderDetailCard', () => {
  const mockOrder: Daum = {
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    items: [{ productSubcategory1: 'Item 1' }, { productSubcategory1: 'Item 2' }],
    quote: { price: { value: 100 } },
  };

  it('renders correctly with order data', () => {
    render(<OrderDetailCard order={mockOrder} />);

    expect(screen.getByText('Service Order')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    expect(screen.getByText('₹100')).toBeInTheDocument();

    expect(screen.getByText('Delivery Time')).toBeInTheDocument();
    expect(screen.getByText(/Jan 1, 2024/i)).toBeInTheDocument();
  });
});
