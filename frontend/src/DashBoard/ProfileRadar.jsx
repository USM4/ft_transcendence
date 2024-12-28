import React ,{useContext} from "react";
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
import { UserDataContext } from "./UserDataContext.jsx";
import { FriendDataContext } from "./FriendDataContext.jsx";
ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function ProfileRadar({ profile,is_user}) {
    const {friends, setFriends} = useContext(FriendDataContext);
    
    let { user } = useContext(UserDataContext);
    if (is_user)
        friends.map((friend) => { friend.username === profile.username ? user = friend : null; });

//     Total Games Played
// Games Won
// Win Rate (calculated as games won / total games played)
// Average Score (average score per game)
// Total XP Gained


    const data = {
        labels: [
            'Total Games Played',
            'Games Won',
            'Win Rate',
            'Total Minutes Spent',
        ],
        datasets: 
        [
            {
                label: "Player Skills",
                data: [user?.matchePlayed ? user?.matchePlayed.length : 0, user?.matcheWon, user?.win_rate,  user?.total_time_spent],
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
            beginAtZero: true,
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