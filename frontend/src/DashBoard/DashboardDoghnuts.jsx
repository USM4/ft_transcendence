import React, {useContext} from "react";
import { UserDataContext } from "./UserDataContext.jsx";
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
  const { user } = useContext(UserDataContext);
  const matches = user?.matchePlayed.length;
  
    const win = (user?.matcheWon / matches) * 100;
    const lose = (user?.matcheLost / matches) * 100;
    const matchedraw = matches - (user?.matcheWon + user?.matcheLost);
    const draw = (matchedraw / matches) * 100;
    const data = {
        labels: [
          'Victory',
          'Lose',
          'Draw'
        ],
        datasets: [{
          label: 'Matches',
          data: [user?.matcheWon, user?.matcheLost, matchedraw],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      };
      const options = {
        elements: {
          line: {
            tension: 0.08,
            borderWidth: 2
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            ticks: {
              display: false,
              stepSize: 1,
              min: 0,
            },
            grid: {
              color: 'rgba(255, 99, 132, 0.2)',
              circular: true,
            },
          }
        }
      };

    const isAllZero = data.datasets[0].data.every((value) => value === 0);

    return(
        <div>
            {isAllZero ? (
              <h1 className="data-chart-h1">No data to display</h1>
            ) : (
                <Radar data={data} options={options} />
            )}
        </div>
        )


}

export default DashboardDoghnuts;