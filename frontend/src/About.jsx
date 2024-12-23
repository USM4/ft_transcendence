import React from 'react';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatIcon from '@mui/icons-material/Chat';
import HttpsIcon from '@mui/icons-material/Https';

const AboutSection = () => {
  return (
    <div className="about">
      <div className="about-div">
        <div className="about-div">
          <div className="head-title">
            <SportsTennisIcon
              style={{ fontSize: "3rem", color: "#f5b83d" }}
            >

            </SportsTennisIcon>
            <h1 style={{ color: "#f5b83d" }}>Welcome to The Mighty Pong</h1>
          </div>
          <p style={{ color: "#e1e4e8" }}>
            Experience the classic arcade game reimagined for the modern web
          </p>

          <div className="about-div">
            <section className="">
              <h2 className="">What is Mighty Pong?</h2>
              <p className="">
                Mighty Pong is a modern take on the legendary 1972 arcade game, bringing the timeless gameplay of Pong into the era of real-time multiplayer gaming. Our platform offers both casual and competitive players the chance to experience the thrill of Pong matches against players from around the world.
              </p>
            </section>

            <section className="">
              <h2 className="">Key Features</h2>
              <div className="about-div">
                <div className="about-div">
                  <div className="head-title">
                    <SportsEsportsIcon
                      style={{ fontSize: "2rem" }}
                    ></SportsEsportsIcon>
                    <h3 className="">Real-Time Multiplayer</h3>
                  </div>
                  <p className="">Challenge friends or random opponents to intense Pong matches with our seamless real-time gameplay system.</p>
                </div>

                <div className="about-div">
                  <div className="head-title">
                    <EmojiEventsIcon style={{ fontSize: "2rem" }}></EmojiEventsIcon>
                    <h3 className="">Tournament System</h3>
                  </div>
                  <p className="">Participate in dynamic tournaments with multiple players, complete with automatic matchmaking and progression tracking.</p>
                </div>

                <div className="about-div">
                  <div className="head-title">
                    <ChatIcon style={{ fontSize: "2rem" }}></ChatIcon>
                    <h3 className="">Live Chat</h3>
                  </div>
                  <p className="">Connect with other players through our integrated chat system, send game invites, and build your Pong community.</p>
                </div>

                <div className="about-div">
                  <div className="head-title">
                    <HttpsIcon style={{ fontSize: "2rem" }}></HttpsIcon>
                    <h3 className="">Secure Authentication</h3>
                  </div>
                  <p className="">Enjoy peace of mind with our robust security features, including 2FA and OAuth 2.0 authentication with 42.</p>
                </div>
              </div>
            </section>

            <section className="">
              <h2 className="">Player Profiles</h2>
              <p className="">
                Create your unique identity in the Mighty Pong community with customizable profiles featuring:
              </p>
              <ul className="about-list">
                <li className="about-items">Personalized avatars and display names</li>
                <li className="about-items">Comprehensive match history and statistics</li>
                <li className="about-items">Friend system with online status tracking</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;