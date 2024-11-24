import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const TournamentRegistration = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentType, setTournamentType] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isTeam, setIsTeam] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);
  const [friendInvites, setFriendInvites] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", {
      tournamentName,
      tournamentType,
      playerName,
      teamName,
      isTeam,
      numPlayers,
      friendInvites,
    });
  };

  const handleCancel = () => {
    setTournamentName("");
    setTournamentType("");
    setPlayerName("");
    setTeamName("");
    setIsTeam(false);
    setNumPlayers(2);
    setFriendInvites(false);
  };

  return (
    <div className="tournament-registration-component">
      <div className="tournament-registration">
        <div className="return-icon"><button><ArrowBackIcon fontSize="large"/></button></div>
        <div className="Ping-Pong Tournament Registration"> Ping-Pong Tournament Registration </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Tournament Name:</label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Enter Tournament Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Enter Your Name:</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter Your Name"
              style={{ fontFamily: "inherit" }}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={friendInvites}
                onChange={() => setFriendInvites(!friendInvites)}
              />
              Invite Friends (Optional)
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Start Tournament</button>
            <button type="button" onClick={handleCancel}>
              Cancel Registration
            </button>
          </div>
        </form>
        <div className="tournament-rules">
          <h3>Tournament Rules:</h3>
          <ul>
            <li>Players must be available at match time.</li>
            <li>Players should be more than 3 (3la hasab)</li>
            <li>10 minutes break between each round.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TournamentRegistration;
