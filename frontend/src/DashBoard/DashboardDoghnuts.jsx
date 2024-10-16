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

function DashboardDoghnuts() {

    const data = {
        labels: [
          'Vistory',
          'Defeat',
          'Draw'
        ],
        datasets: [{
          label: 'Victory',
          data: [100, 70, 99],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Defeat',
          data: [20, 20, 0],
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
          data: [0, 50, 40],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: '#edd696',
          pointBackgroundColor: '#edd696',
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
            suggestedMin: 50,
            suggestedMax: 100,
            ticks: {
              stepSize: 50
            }
          }
        }
      };
    return<Radar data={data} options={options}/>
}

export default DashboardDoghnuts;