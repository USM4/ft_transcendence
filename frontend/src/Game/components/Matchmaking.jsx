import React, { useState } from "react";
import PongGame from "./PongGame";

const Matchmaking = () => {
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (roomName.trim() !== "") {
      setJoined(true);
    }
  };

  return joined ? (
    <PongGame isAIEnabled={true} roomName={roomName} />
  ) : (
    <div>
      <h2>Enter Room Name</h2>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Matchmaking;
