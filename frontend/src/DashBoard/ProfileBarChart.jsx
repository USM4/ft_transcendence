import React ,{useContext, useState} from "react";
import { Bar } from 'react-chartjs-2';
import { colors } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend } from 'chart.js';
import {UserDataContext} from "./UserDataContext";
import {FriendDataContext} from "./FriendDataContext";
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend);

function ProfileBarChart({ profile,is_user}) {
  let { user } = useContext(UserDataContext);
  const {friends, setFriends} = useContext(FriendDataContext);
  if (is_user)
    friends.map((friend) => { friend.username === profile.username ? user = friend : null; });
  
  const matche = user?.matchePlayed ? user?.matchePlayed.map((matche, index) => `Match ${index + 1}`) : [];
  const data = {
    labels: matche,
    datasets: [
      {
        label: `${user?.username}'s activity`,
        data: user?.xp,
        fill: false,
        backgroundColor: 'green',
        borderColor: 'rgb(174, 255, 218)',
      },
      {
        label: 'Opponent activity',
        data: user?.matchePlayed ? user?.matchePlayed.map((match) => match[0]['xp_gained_player2']) : [],
        fill: false,
        backgroundColor: '#D4FCB5',
        borderColor: 'rgb(0, 191, 255) ',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(0, 191, 255)',
          },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProfileBarChart;