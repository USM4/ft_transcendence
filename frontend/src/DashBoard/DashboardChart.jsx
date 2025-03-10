import React, {useContext, useState} from "react";
import { Line } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
import { colors } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { UserDataContext } from "./UserDataContext.jsx";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function DashboardChart() {
  const { user } = useContext(UserDataContext);
  let isAllZero = false;
  const matche =  user?.matchePlayed ?  user?.matchePlayed.map((matche, index) => `Matche${index + 1}`) : [];


  const data = {
    labels: matche,
    datasets: [
      {
        label: `${user?.username}'s activity`,
        data: user?.xp,
        fill: false,
        backgroundColor: 'rgba(174, 255, 218,1)',
        borderColor: 'rgb(174, 255, 218) ',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null,
        position: 'bottom',
        labels: {
            color: 'rgb(0, 191, 255)',
          },
      },
    },
  };
  if (data?.datasets[0])
    isAllZero = data.datasets[0].data.every((element) => element === 0);

  return (
    isAllZero ? <h1 className="data-chart-h1"> No data to display
    </h1> :
  <Line data={data} options={options} />
)
};

export default DashboardChart;