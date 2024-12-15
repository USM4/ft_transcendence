import React from "react";

const WaitingOpponent = (isVisible) => {

    if (!isVisible)
        return null;

  return (
    <div className="waiting-screen">
      <div className="ping-pong-animation">
        <div className="paddle left-paddle"></div>
        <div className="ball"></div>
        <div className="paddle right-paddle"></div>
      </div>
      <div className="waiting-text">
        <h2>Waiting for opponent</h2>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
export default WaitingOpponent;
