import { Bar } from "react-chartjs-2";
import React, { useCallback, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const BarChart = ({ data }) => {
  
  if(!data) return <div>no data available!!</div>

  const chartData = {
    labels: ["Prevous Month", "Current Month"],// x-axis
    datasets: [
      {
        label: "Total Sales",
        data: [data.previousMonth, data.currentMonth],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"], //for each month there is a background color
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,// adjust the size dynamaically to the container 
    maintainAspectRatio: true,
    scales:{
      y:{
        beginAtZero: true
      },
    },
};

  return (
    <div className="w-full h-1/2 md:h-1/3 lg:h-80">
      <Bar data={chartData} options={options} />
      <div className="growth-rate">
        <p>Growth Rate: {`${(data.growthRate * 100).toFixed(2)}%`}</p>
      </div>
    </div>
  );
}


export default BarChart;