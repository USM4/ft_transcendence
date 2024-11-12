import React from 'react';
import Chat_sidebar from './Chat-sidebar.jsx';
import catAvatar from '../assets/cat.jpg';
import dbzAvatar from '../assets/DBZ.jpg';
import aceAvatar from '../assets/ace.jpg';

const friends = [
  {
    name: "AliceAliceAliceAliceAliceAliceAliceAliceAliceAliceAlice",
    avatar: catAvatar,
    lastMessage: "Hey there!",
  },
  {
    name: "Bob",
    avatar: dbzAvatar,
    lastMessage: "Let's catch up later!Let's catch up laterLet's catch up laterLet's catch up laterLet's catch up later",
  },
  {
    name: "Charlie",
    avatar: aceAvatar,
    lastMessage: "What's up?",
  },
  { name: "Alice", avatar: catAvatar, lastMessage: "Hey, how are you?" },
  { name: "Bob", avatar: catAvatar, lastMessage: "Let's catch up soon!" },
  { name: "David", avatar: catAvatar, lastMessage: "Did you finish the project?" },
  { name: "Eve", avatar: catAvatar, lastMessage: "Good morning!" },
  { name: "Frank", avatar: catAvatar, lastMessage: "I'm on my way." },
  { name: "Grace", avatar: catAvatar, lastMessage: "See you later!" },
  { name: "Hannah", avatar: catAvatar, lastMessage: "Can you send the file?" },
  { name: "Ivan", avatar: catAvatar, lastMessage: "I'll be there at 5." },
  { name: "Judy", avatar: catAvatar, lastMessage: "Thanks for your help!" },
  { name: "Kevin", avatar: catAvatar, lastMessage: "Are you free tomorrow?" },
  { name: "Laura", avatar: catAvatar, lastMessage: "Call me when you can." },
  { name: "Mike", avatar: catAvatar, lastMessage: "Got it, thanks!" },
  { name: "Nina", avatar: catAvatar, lastMessage: "Happy birthday!" },
  { name: "Oscar", avatar: catAvatar, lastMessage: "What's the plan?" },
  { name: "Pam", avatar: catAvatar, lastMessage: "Just sent the email." },
  { name: "Quincy", avatar: catAvatar, lastMessage: "Let’s go for lunch." },
  { name: "Rachel", avatar: catAvatar, lastMessage: "How was your weekend?" },
  { name: "Sam", avatar: catAvatar, lastMessage: "Miss you!" },
  { name: "Tina", avatar: catAvatar, lastMessage: "I'm so excited!" },
  { name: "Uma", avatar: catAvatar, lastMessage: "See you at the meeting." },
  { name: "Victor", avatar: catAvatar, lastMessage: "No worries." },
  { name: "Wendy", avatar: catAvatar, lastMessage: "Can you review this?" },
  { name: "Xander", avatar: catAvatar, lastMessage: "Let's discuss this later." },
  { name: "Yara", avatar: catAvatar, lastMessage: "Great job on the report!" },
  { name: "Zane", avatar: catAvatar, lastMessage: "All set for tomorrow." },
  { name: "Bella", avatar: catAvatar, lastMessage: "Can you help me?" },
  { name: "Carlos", avatar: catAvatar, lastMessage: "Long time no see!" },
  { name: "Dana", avatar: catAvatar, lastMessage: "I'll check it out." },
  { name: "Eli", avatar: catAvatar, lastMessage: "What’s the update?" },
  { name: "Fiona", avatar: catAvatar, lastMessage: "I’m running late." },
  { name: "George", avatar: catAvatar, lastMessage: "Good to go!" },
];

export default function Chat()
{
    return(
      <>
        <Chat_sidebar friends={friends}></Chat_sidebar>
      </>

    );
}