import React from "react";
import { Bar } from 'react-chartjs-2';
import { colors } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend);

function ProfileBarChart() {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturay', 'Sunday'],
    datasets: [
      {
        label: 'Victory',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'green',
        borderColor: 'rgb(235, 135, 85)',
        tension: 0.1,
      },
      {
        label: 'Lost',
        data: [65, 100, 30, 66, 55, 90, 200],
        fill: false,
        backgroundColor: '#D4FCB5',
        borderColor: '#008080',
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
            color: '#f4d35e', // Set the color of the legend labels
          },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProfileBarChart;