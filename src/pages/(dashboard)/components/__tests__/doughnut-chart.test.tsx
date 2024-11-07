import { render, screen } from '@testing-library/react';
import DoughnutChart from '../doughnut-chart'; 
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

describe('DoughnutChart Component', () => {
  const mockData = {
    datasets: [
      {
        data: [3, 1],
        backgroundColor: ['grey', 'red'],
        hoverBackgroundColor: ['grey', 'red'],
      },
    ],
  };

  it('renders the Doughnut chart with provided data', () => {
    render(<DoughnutChart data={mockData} />);

    // Assert that the canvas is rendered
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
  });
});
