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

function ProfileRadar() {

    const data = {
        labels: [
            'Offensive Skills',
            'Defensive Skills',
            'Speed',
            'Shot Precision',
            'Consistency',
            'Strategy',
            'Tactical Awareness',
        ],
        datasets: 
        [
            {
                label: "Player Skills",
                data: [80, 80, 100, 80, 100, 70, 100],
                fill: true,
                backgroundColor: 'rgba(255, 111, 97, 0.5)',
                borderColor: 'rgba(255, 111, 97, 1)',
                pointBackgroundColor: 'rgba(255, 111, 97, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 111, 97, 1)',
            },
        ],
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
                stepSize: 10,
                color: 'black',
                backdropColor: 'rgba(0, 0, 0, 0)',
            }
        }

    }
    };
    return<Radar data={data} options={options}/>
}

export default ProfileRadar;