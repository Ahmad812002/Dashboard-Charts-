import { Line } from "react-chartjs-2";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  if (!data) return <div>data not available!!</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "User Growth",
        data: data.data,
        fill: false,
        borderColor: "rgb(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Allow flexible aspect ratio
  };

  return (
    <div className="w-full h-auto md:h-80 lg:h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
