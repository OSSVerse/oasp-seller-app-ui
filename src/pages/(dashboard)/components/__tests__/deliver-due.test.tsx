import { render, screen } from '@testing-library/react';
import DeliveryDue from '../deliver-due';
import AssessmentDoughnutChart from '../doughnut-chart';

// Mock AssessmentDoughnutChart 组件
vi.mock('../doughnut-chart', () => {
  return {
    default: vi.fn(() => <div>Mocked Doughnut Chart</div>),
  };
});

describe('DeliveryDue Component', () => {
  it('renders with warning styles when dayDiff is 1 or less', () => {
    render(<DeliveryDue dayDiff={1} />);
    
    // Assert that the doughnut chart is rendered
    expect(screen.getByText('Mocked Doughnut Chart')).toBeInTheDocument();
    
    // Assert that the due message has red text
    const dueMessage = screen.getByText('Due in 1 Days');
    expect(dueMessage).toHaveClass('text-red-500');
  });

  it('renders with health styles when dayDiff is greater than 1', () => {
    render(<DeliveryDue dayDiff={2} />);
    
    // Assert that the doughnut chart is rendered
    expect(screen.getByText('Mocked Doughnut Chart')).toBeInTheDocument();
    
    // Assert that the due message does not have red text
    const dueMessage = screen.getByText('Due in 2 Days');
    expect(dueMessage).not.toHaveClass('text-red-500');
  });
});
