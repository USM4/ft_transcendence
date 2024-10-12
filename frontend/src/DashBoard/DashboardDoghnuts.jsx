import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { colors } from "@mui/material";
ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function DashboardDoghnuts(params) {

    const data = {
        labels: [
          'Vistory',
          'Defeat',
          'Draw'
        ],
        datasets: [{
          label: 'Victory',
          data: [100, 100, 100],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Defeat',
          data: [0, 0, 0],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }
        , 
        {
          label: 'Draw',
          data: [28, 48, 40],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
      const options = {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      };
    return<Radar data={data} options={options}/>
}

export default DashboardDoghnuts;