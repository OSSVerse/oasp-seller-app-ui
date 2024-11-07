import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement);

interface DoughnutChartProps {
  data: {
    datasets: IDataset[];
  };
}

interface IDataset {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

const options = {
  responsive: true,
  cutout: "65%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    arc: {
      borderRadius: 20,
    },
  },
};
const DoughnutChart = ({ data }: DoughnutChartProps) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
