import { render, screen } from '@testing-library/react';
import AccountInfo from '../account-info'; // Ensure the path is correct
import type { Buyer } from './order-list';
import type { Daum } from '@/services/orders-service';

// Mock data for tests
const mockBuyer: Buyer = {
  firstName: 'John',
  lastName: 'Doe',
};

const mockOrder: Daum = {
  billing: {
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  },
  quote: {
    price: {
      value: 1000,
    },
  },
};

describe('AccountInfo', () => {
  // it('renders business details correctly', () => {
  //   render(<AccountInfo buyer={mockBuyer} order={mockOrder} />);

  //   // Assert that the main header is rendered
  //   expect(screen.getByText('Business Details')).toBeInTheDocument();

  //   // Assert buyer's first name
  //   expect(screen.getByText(/First Name/i)).toBeInTheDocument();
  //   expect(screen.getByText(mockBuyer.firstName)).toBeInTheDocument();

  //   // Assert buyer's last name
  //   expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
  //   expect(screen.getByText(mockBuyer.lastName)).toBeInTheDocument();

  //   // Assert billing email
  //   expect(screen.getByText(/Work Mail/i)).toBeInTheDocument();
  //   expect(screen.getByText(mockOrder.billing.email)).toBeInTheDocument();

  //   // Assert billing phone
  //   expect(screen.getByText("Phone")).toBeInTheDocument();
  //   expect(screen.getByText(mockOrder.billing.phone)).toBeInTheDocument();

  //   // Assert payment method
  //   expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
  //   expect(screen.getByText('Paypal')).toBeInTheDocument();

  //   // Assert payment status
  //   expect(screen.getByText(/Status/i)).toBeInTheDocument();
  //   expect(screen.getByText('Verified')).toBeInTheDocument();

  //   // Assert amount
  //   expect(screen.getByText(/Amount/i)).toBeInTheDocument();
  //   expect(screen.getByText('₹1000')).toBeInTheDocument();
  // });

  // it('renders correctly with missing order details', () => {
  //   // Render with missing order details
  //   render(<AccountInfo buyer={mockBuyer} order={{ billing: { email: '', phone: '' }, quote: { price: { value: null } } }} />);

  //   // Assert that the fields still render but handle missing values gracefully
  //   expect(screen.getByText(mockBuyer.firstName)).toBeInTheDocument();
  //   expect(screen.getByText(mockBuyer.lastName)).toBeInTheDocument();

  //   // Billing email and phone should be rendered but can be empty
  //   expect(screen.getByText(/Work Mail/i)).toBeInTheDocument();
  //   expect(screen.getByText("Phone")).toBeInTheDocument();

  //   // Payment method and status
  //   expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
  //   expect(screen.getByText('Paypal')).toBeInTheDocument();
  //   expect(screen.getByText(/Status/i)).toBeInTheDocument();
  //   expect(screen.getByText('Verified')).toBeInTheDocument();

  //   // Amount should show as '₹null' or similar depending on implementation
  //   expect(screen.getByText(/Amount/i)).toBeInTheDocument();
  //   expect(screen.getByText(/₹0/i)).toBeInTheDocument(); // Update based on your actual implementation
  // });
});
