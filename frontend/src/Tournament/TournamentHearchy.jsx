import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const TournamentHearchy = () => {
	const navigate = useNavigate();
	const [winner, setWinner] = useState("");
	const playersName = JSON.parse(localStorage.getItem('players'));

	const [tournamentState, setTournamentState] = useState({
        players: {
            matche1: {
                Player1: playersName[0].name,
                Player2: playersName[1].name,
                score1: 0,
                score2: 0,
                winner: null,
            },
            matche2: {
                Player1: playersName[2].name,
                Player2: playersName[3].name,
                score1: 0,
                score2: 0,
                winner: null,
            },
            matche3: {
                Player1: playersName[4].name,
                Player2: playersName[5].name,
                score1: 0,
                score2: 0,
                winner: null,
            },
            matche4: {
                Player1: playersName[6].name,
                Player2: playersName[7].name,
                score1: 0,
                score2: 0,
                winner: null,
            },
        },
        semi_players: {
            matche1: {
                Player1: null,
                Player2: null,
                score1: 0,
                score2: 0,
                winner: null,
            },
            matche2: {
                Player1: null,
                Player2: null,
                score1: 0,
                score2: 0,
                winner: null,
            },
        },
        final_players: {
            matche: {
                Player1: null,
                Player2: null,
                score1: 0,
                score2: 0,
                winner: null,
            },
        },
        ongoing:
		{
			Player1: playersName[0].name,
            Player2: playersName[1].name,
			score1: 0,
			score2: 0,
			winner: null,
		}
    });

	useEffect(() => {
		const currentStoredState = localStorage.getItem('tournamentState');
		const currentStateString = JSON.stringify(tournamentState);
	
		console.log('currentStoredState', currentStoredState);
		console.log('currentStateString', currentStateString);
		if (currentStoredState !== currentStateString) {

			localStorage.setItem('tournamentState', currentStoredState);
			setTournamentState(JSON.parse(currentStoredState));
		}
	}, [tournamentState]);

    useEffect(() => {
        const savedTournamentState = localStorage.getItem('tournamentState');
        
        if (savedTournamentState) {
            const parsedState = JSON.parse(savedTournamentState);
            setTournamentState(prevState => ({
                ...prevState,
                ...parsedState
            }));
        }
    }, []);

    useEffect(() => {
        const matchePlayed = JSON.parse(localStorage.getItem('matchePlayed'));
        
        if (matchePlayed) {
            localStorage.removeItem('matchePlayed');

            setTournamentState(prevState => {
                const updatedState = { ...prevState };

                const quarterFinalKeys = ['matche1', 'matche2', 'matche3', 'matche4'];
                quarterFinalKeys.forEach(matchKey => {
                    const match = updatedState.players[matchKey];
                    if (
                        (match.Player1 === matchePlayed.Player1 && match.Player2 === matchePlayed.Player2) ||
                        (match.Player1 === matchePlayed.Player2 && match.Player2 === matchePlayed.Player1)
                    ) {
                        match.score1 = matchePlayed.score1;
                        match.score2 = matchePlayed.score2;
                        match.winner = matchePlayed.winner;
                    }
                });

                const quarterFinalsWinners = {
                    'matche1': updatedState.players.matche1.winner,
                    'matche2': updatedState.players.matche2.winner,
                    'matche3': updatedState.players.matche3.winner,
                    'matche4': updatedState.players.matche4.winner
                };

                if ((!updatedState.semi_players.matche1.Player1 || !updatedState.semi_players.matche1.Player2) && (quarterFinalsWinners.matche1 || quarterFinalsWinners.matche2)) {
                    updatedState.semi_players.matche1 = {
                        Player1: quarterFinalsWinners.matche1,
                        Player2: quarterFinalsWinners.matche2,
						score1: 0,
						score2: 0,
						winner: null,
                    };
                }

                if ((!updatedState.semi_players.matche2.Player1 || !updatedState.semi_players.matche2.Player2) && (quarterFinalsWinners.matche3 || quarterFinalsWinners.matche4)) {
                    updatedState.semi_players.matche2 = {
                        Player1: quarterFinalsWinners.matche3,
                        Player2: quarterFinalsWinners.matche4,
						score1: 0,
						score2: 0,
						winner: null,
                    };
                }

                const semiFinalKeys = ['matche1', 'matche2'];
                semiFinalKeys.forEach(matchKey => {
                    const match = updatedState.semi_players[matchKey];
                    if (
                        match.Player1 === matchePlayed.Player1 && match.Player2 === matchePlayed.Player2 ||
						match.Player1 === matchePlayed.Player2 && match.Player2 === matchePlayed.Player1
					) {
                        match.score1 = matchePlayed.score1;
                        match.score2 = matchePlayed.score2;
                        match.winner = matchePlayed.winner;
                    }
                });

                const semiFinalWinners = {
                    'matche1': updatedState.semi_players.matche1.winner,
                    'matche2': updatedState.semi_players.matche2.winner,
                };

                if ((!updatedState.final_players.matche.Player1 || !updatedState.final_players.matche.Player2) && (semiFinalWinners.matche1 || semiFinalWinners.matche2)) {
                    updatedState.final_players.matche = {
                        Player1: semiFinalWinners.matche1,
                        Player2: semiFinalWinners.matche2,
						score1: 0,
						score2: 0,
						winner: null,
                    };
                }

                const finalMatch = updatedState.final_players.matche;
                if (
                    finalMatch.Player1 === matchePlayed.Player1 && finalMatch.Player2 === matchePlayed.Player2 || 
					finalMatch.Player1 === matchePlayed.Player2 && finalMatch.Player2 === matchePlayed.Player1
				) {
                    finalMatch.score1 = matchePlayed.score1;
                    finalMatch.score2 = matchePlayed.score2;
                    finalMatch.winner = matchePlayed.winner;
                    
                    if (matchePlayed.winner) {
                        setWinner(matchePlayed.winner);
                    }
                }

                updatedState.ongoing = matchePlayed;
                
                localStorage.setItem('tournamentState', JSON.stringify(updatedState));
                
                return updatedState;
            });
        }
    }, []);

    const startgame = async (matche, nextmatche) => {
        if (matche) {
            setTournamentState(prevState => ({
                ...prevState,
                ongoing: nextmatche
            }));
            localStorage.setItem('tournamentState', JSON.stringify(tournamentState));
            
            localStorage.setItem('matche', JSON.stringify(matche));
            navigate("/tournament/options/pong-tournament");
        }
    };

	const handlClick = async () => {
		const state = { ...tournamentState };
	
		if (!state.players.matche1.winner) {
			await startgame(state.players.matche1, state.players.matche2);
			return; 
		}
		if (!state.players.matche2.winner) {
			await startgame(state.players.matche2, state.players.matche3);
			return;
		}
		if (!state.players.matche3.winner) {
			await startgame(state.players.matche3, state.players.matche4);
			return;
		}
		if (!state.players.matche4.winner) {
			await startgame(state.players.matche4, state.semi_players.matche1);
			return;
		}
	
		if (!state.semi_players.matche1.winner) {
			await startgame(state.semi_players.matche1, state.semi_players.matche2);
			return;
		}
		if (!state.semi_players.matche2.winner) {
			await startgame(state.semi_players.matche2, state.final_players.matche);
			return;
		}
	
		if (!state.final_players.matche.winner) {
			await startgame(state.final_players.matche, null);
			return;
		}
	};
	
	const resetTournament = () => {
		navigate("/tournament/options/tournament-registration");
		localStorage.clear()
	};

	return (
		<div className="tournament">
			<svg
				className="tournament-svg"
				viewBox="0 0 1351 422"
				xmlns="http://www.w3.org/2000/svg"
				style={winner ? { filter: 'blur(10px)' } : {}}
			>
				<defs>
					<pattern id="image1" width="32" height="32">
						<image href="/pensioner.png" x="4" y="4" width="32" height="32" />
					</pattern>
				</defs>
				{/*---------------------------------------------- LEFT START ----------------------------------------------*/}
				<rect
					x="0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche1.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="87"
					y="32"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche1.Player1 + ": " + tournamentState.players.matche1.score1}
				</text>
				<rect
					x="0.5"
					y="94.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche1.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="87"
					y="126"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche1.Player2 + ": " + tournamentState.players.matche1.score2}
				</text>
				<rect
					x="0.5"
					y="273.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche2.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="87"
					y="305"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche2.Player1 + ": " + tournamentState.players.matche2.score1}
				</text>
				<rect
					x="0.5"
					y="367.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche2.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="87"
					y="400"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche2.Player2 + ": " + tournamentState.players.matche2.score2}
				</text>



				<line x1="148" y1="26.5" x2="169" y2="26.5" stroke="#FFD700" />
				<line x1="148" y1="120.5" x2="169" y2="120.5" stroke="#FFD700" />
				<line x1="169.5" y1="26" x2="169.5" y2="121" stroke="#FFD700" />
				{/*---------------------------------------------- Right START ----------------------------------------------*/}
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 0)"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche3.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche3.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1263"
					y="31"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche3.score1 + " :" + tournamentState.players.matche3.Player1}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 94)"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche3.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche3.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1263"
					y="126"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche3.score2 + " :" + tournamentState.players.matche3.Player2}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 367)"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche4.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche4.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1263"
					y="400"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche4.score2 + " :" + tournamentState.players.matche4.Player2}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 273)"
					stroke={(tournamentState.ongoing.Player1 == tournamentState.players.matche4.Player1 && tournamentState.ongoing.Player2 == tournamentState.players.matche4.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1263"
					y="305"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.players.matche4.score1 + " :" + tournamentState.players.matche4.Player1}
				</text>


				<line x1="148" y1="300.5" x2="169" y2="300.5" stroke="#FFD700" />
				<line x1="148" y1="394.5" x2="169" y2="394.5" stroke="#FFD700" />
				<line x1="169.5" y1="300" x2="169.5" y2="395" stroke="#FFD700" />
				{/*---------------------------------------------- LEFT SEMI_FINAL ----------------------------------------------*/}
				<rect
					x="242.5"
					y="136.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.semi_players && tournamentState.ongoing.Player1 == tournamentState.semi_players.matche1.Player1 && tournamentState.ongoing.Player2 == tournamentState.semi_players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="330"
					y="168"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.semi_players.matche1.Player1 && (tournamentState.semi_players.matche1.Player1 + ": " + tournamentState.semi_players.matche1.score1)}
				</text>
				<rect
					x="242.5"
					y="230.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.semi_players && tournamentState.ongoing.Player1 == tournamentState.semi_players.matche1.Player1 && tournamentState.ongoing.Player2 == tournamentState.semi_players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="330"
					y="262"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.semi_players.matche1.Player2 && (tournamentState.semi_players.matche1.Player2 + ": " + tournamentState.semi_players.matche1.score2)}
				</text>
				{/*---------------------------------------------- RIGHT SEMI_FINAL ----------------------------------------------*/}
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1108 230)"
					stroke={(tournamentState.semi_players && tournamentState.ongoing.Player1 == tournamentState.semi_players.matche2.Player1 && tournamentState.ongoing.Player2 == tournamentState.semi_players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1020"
					y="262"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.semi_players.matche2.Player1 && (tournamentState.semi_players.matche2.score1 + " :" + tournamentState.semi_players.matche2.Player1)}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1108 136)"
					stroke={(tournamentState.semi_players && tournamentState.ongoing.Player1 == tournamentState.semi_players.matche2.Player1 && tournamentState.ongoing.Player2 == tournamentState.semi_players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1020"
					y="167"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.semi_players.matche2.Player2 && (tournamentState.semi_players.matche2.score2 + " :" + tournamentState.semi_players.matche2.Player2)}
				</text>
				<line x1="390" y1="163.5" x2="411" y2="163.5" stroke="#FFD700" />
				<line x1="390" y1="257.5" x2="411" y2="257.5" stroke="#FFD700" />
				<line x1="411.5" y1="163" x2="411.5" y2="258" stroke="#FFD700" />
				<line x1="169" y1="346.5" x2="316" y2="346.5" stroke="#FFD700" />
				<line x1="315.5" y1="347" x2="315.5" y2="285" stroke="#FFD700" />
				<line
					y1="-0.5"
					x2="147"
					y2="-0.5"
					transform="matrix(1 0 0 -1 169 74)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="62"
					y2="-0.5"
					transform="matrix(0 1 1 0 316 74)"
					stroke="#FFD700"
				/>
				<line x1="411" y1="209.5" x2="484" y2="209.5" stroke="#FFD700" />
				{/*---------------------------------------------- FINAL ----------------------------------------------*/}
				<rect
					x="484.5"
					y="183.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(tournamentState.final_players && tournamentState.ongoing.Player1 == tournamentState.final_players.matche.Player1 && tournamentState.ongoing.Player2 == tournamentState.final_players.matche.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="535"
					y="215"
					fill="#FFD700"
					fontSize="12"
					textAnchor="start"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.final_players.matche.Player1 && (tournamentState.final_players.matche.Player1 + ": " + tournamentState.final_players.matche.score1)}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 866 183)"
					stroke={(tournamentState.final_players && tournamentState.ongoing.Player1 == tournamentState.final_players.matche.Player1 && tournamentState.ongoing.Player2 == tournamentState.final_players.matche.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="815"
					y="215"
					fill="#FFD700"
					fontSize="12"
					textAnchor="end"
					fontFamily="IBM Plex Mono"
				>
					{tournamentState.final_players.matche.Player2 && (tournamentState.final_players.matche.score2 + ": " + tournamentState.final_players.matche.Player2)}
				</text>


				<line
					y1="-0.5"
					x2="21"
					y2="-0.5"
					transform="matrix(-1 0 0 1 1203 27)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="21"
					y2="-0.5"
					transform="matrix(-1 0 0 1 1203 121)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="95"
					y2="-0.5"
					transform="matrix(4.32513e-08 1 1 -4.32513e-08 1182 26)"
					stroke="#FFD700"
				/>



				<line
					y1="-0.5"
					x2="21"
					y2="-0.5"
					transform="matrix(-1 0 0 1 1203 395)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="95"
					y2="-0.5"
					transform="matrix(4.32513e-08 1 1 -4.32513e-08 1182 300)"
					stroke="#FFD700"
				/>

				<line
					y1="-0.5"
					x2="21"
					y2="-0.5"
					transform="matrix(-1 0 0 1 1203 301)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="21"
					y2="-0.5"
					transform="matrix(-1 0 0 1 961 164)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="21"
					y2="-0.5"
					transform="matrix(-1 0 0 1 961 258)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="95"
					y2="-0.5"
					transform="matrix(4.32513e-08 1 1 -4.32513e-08 940 163)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="147"
					y2="-0.5"
					transform="matrix(-1 0 0 1 1182 347)"
					stroke="#FFD700"
				/>
				<line
					y1="-0.5"
					x2="62"
					y2="-0.5"
					transform="matrix(0 -1 -1 0 1035 347)"
					stroke="#FFD700"
				/>
				<line x1="1182" y1="74.5" x2="1035" y2="74.5" stroke="#FFD700" />
				<line x1="1035.5" y1="74" x2="1035.5" y2="136" stroke="#FFD700" />
				<line
					y1="-0.5"
					x2="73"
					y2="-0.5"
					transform="matrix(-1 0 0 1 940 210)"
					stroke="#FFD700"
				/>
				<circle cx="25" cy="27" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1345 8)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="267" cy="164" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1103 145)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="267" cy="258" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1103 239)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="511" cy="210" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 859 191)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="25" cy="121" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1345 102)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="25" cy="300" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1345 281)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="25" cy="395" r="18.5" stroke="#FFD700" fill="url(#image1)" />

				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1345 376)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
			</svg>
			<div className="start-tournament" style={winner ? { filter: 'blur(10px)' } : {}}>
				<button
					onClick={handlClick}
					style={{ cursor: winner ? 'default' : 'pointer', backgroundColor: winner ? 'grey' : '' }}
					disabled={winner}
				>
					<p> Start The Party 🔥 </p>
				</button>
			</div>
			{winner && (
				<div className="winner-display">
					<h2>🏆 The Winner is {winner} 🎉</h2>
					<button onClick={resetTournament}>Reset Tournament</button>
				</div>
			)}
		</div>
	);
};
export default TournamentHearchy;
