import { Doughnut } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const DoughnutChart = ({ data }) => {

  if(!data || !data.categories) return <div>no data available!!</div>

  const chartData = {
    labels: data.categories.map((category) => category.category),
    datasets: [
      {
        label: "Revenue Breakdown",
        data: data.categories.map((category) => category.revenue),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '50%', 
  };
  
  return (
    <div className="w-full h-1/2 md:h-1/3 lg:h-80">
      <Doughnut data={chartData} options={options} />;
    </div>
  )
}

export default DoughnutChart;
