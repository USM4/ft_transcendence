import React from "react";
import { Line } from 'react-chartjs-2';
import { colors } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function DashboardChart() {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturay', 'Sunday'],
    datasets: [
      {
        label: 'Oussama steps',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(174, 255, 218,1)',
        borderColor: 'rgb(174, 255, 218) ',
        tension: 0.1,
      },
      {
        label: 'Challenger1 steps',
        data: [65, 100, 30, 66, 55, 90, 200],
        fill: false,
        backgroundColor: 'rgba(0, 191, 255,1)',
        borderColor: 'rgb(0, 191, 255) ',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
            color: 'rgb(0, 0, 128)', // Set the color of the legend labels
          },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DashboardChart;