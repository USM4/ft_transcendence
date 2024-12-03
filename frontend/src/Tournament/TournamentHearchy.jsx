import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const TournamentHearchy = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [winner, setWinner] = useState("");
	const [ongoing, setOngoing] = useState({ Player1: "", Player2: "" });
	
	console.log("LOCATION", location)
	const players = {
		matche1: {
			Player1: location.state[0].name,
			Player2: location.state[1].name,
		},
		matche2: {
			Player1: location.state[2].name,
			Player2: location.state[3].name,

		},
		matche3: {
			Player1: location.state[4].name,
			Player2: location.state[5].name,

		},
		matche4: {
			Player1: location.state[6].name,
			Player2: location.state[7].name,

		},
	}
	const [semi_players, setSemi_Players] = useState({
		matche1: {
			Player1: null,
			Player2: null,
		},
		matche2: {
			Player1: null,
			Player2: null,
		},
	})
	const [final_players, setFinal_Players] = useState({
		matche: {
			Player1: null,
			Player2: null,
		},
	})

	const handlClick = () => {
				
		// const semiResults = {
		// 	matche1:{
		// 		Player1: navigate("/tournament/options/play-tournament/game" , { state: players.matche1 }),
		// 		Player2: navigate("/tournament/options/play-tournament/game" , { state: players.matche2 }),
		// 	},
		// 	matche2:{
		// 		Player1: navigate("/tournament/options/play-tournament/game" , { state: players.matche3 }),
		// 		Player2: navigate("/tournament/options/play-tournament/game" , { state: players.matche4 }),
		// 	},
		// };
		// setSemi_Players(semiResults);
	};
	// useEffect(() => {
	// const play_final = async () => {
	// 		if (semi_players.matche1 && semi_players.matche2) {
	// 			const finalResults = {
	// 				matche:
	// 				{
	// 					Player1: await startgame(semi_players.matche1),
	// 					Player2: await startgame(semi_players.matche2),
	// 				} 
	// 			};
	// 			setFinal_Players(finalResults);
	// 		}
	// 	}
	// 	play_final();
	// }, [semi_players]);
	// useEffect(() => {
	// 	const get_winner = async () => {
	// 		if (final_players.matche) {
	// 			const matchWinner = await startgame(final_players.matche);
	// 			setWinner(matchWinner);
	// 		}
	// 	}
	// 	get_winner();
	// }, [final_players]);
	const resetTournament = () => {
		navigate("/tournament/options/tournament-registration");
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
					stroke={(ongoing.Player1 == players.matche1.Player1 && ongoing.Player2 == players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="77"
					y="32"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche1.Player1}
				</text>
				<rect
					x="0.5"
					y="94.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(ongoing.Player1 == players.matche1.Player1 && ongoing.Player2 == players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="77"
					y="126"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche1.Player2}
				</text>
				<rect
					x="0.5"
					y="273.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(ongoing.Player1 == players.matche2.Player1 && ongoing.Player2 == players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="77"
					y="305"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche2.Player1}
				</text>
				<rect
					x="0.5"
					y="367.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(ongoing.Player1 == players.matche2.Player1 && ongoing.Player2 == players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="77"
					y="400"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche2.Player2}
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
					stroke={(ongoing.Player1 == players.matche3.Player1 && ongoing.Player2 == players.matche3.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1273"
					y="28"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche3.Player1}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 94)"
					stroke={(ongoing.Player1 == players.matche3.Player1 && ongoing.Player2 == players.matche3.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1268"
					y="126"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche3.Player2}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 367)"
					stroke={(ongoing.Player1 == players.matche4.Player1 && ongoing.Player2 == players.matche4.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1270"
					y="400"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche4.Player2}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1350 273)"
					stroke={(ongoing.Player1 == players.matche4.Player1 && ongoing.Player2 == players.matche4.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1270"
					y="305"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{players.matche4.Player1}
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
					stroke={(semi_players && ongoing.Player1 == semi_players.matche1.Player1 && ongoing.Player2 == semi_players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="320"
					y="168"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{semi_players.matche1.Player1}
				</text>
				<rect
					x="242.5"
					y="230.5"
					width="147"
					height="54"
					rx="14.5"
					stroke={(semi_players && ongoing.Player1 == semi_players.matche1.Player1 && ongoing.Player2 == semi_players.matche1.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="320"
					y="262"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{semi_players.matche1.Player2}
				</text>
				{/*---------------------------------------------- RIGHT SEMI_FINAL ----------------------------------------------*/}
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1108 230)"
					stroke={(semi_players && ongoing.Player1 == semi_players.matche2.Player1 && ongoing.Player2 == semi_players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1020"
					y="262"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{semi_players.matche2.Player1}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 1108 136)"
					stroke={(semi_players && ongoing.Player1 == semi_players.matche2.Player1 && ongoing.Player2 == semi_players.matche2.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="1020"
					y="167"
					fill="#FFD700"
					fontSize="12"
					textAnchor="middle"
					fontFamily="IBM Plex Mono"
				>
					{semi_players.matche2.Player2}
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
					stroke={(final_players && ongoing.Player1 == final_players.matche.Player1 && ongoing.Player2 == final_players.matche.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="558"
					y="215"
					fill="#FFD700"
					fontSize="12"
					textAnchor="start"
					fontFamily="IBM Plex Mono"
				>
					{final_players.matche.Player1}
				</text>
				<rect
					x="-0.5"
					y="0.5"
					width="147"
					height="54"
					rx="14.5"
					transform="matrix(-1 0 0 1 866 183)"
					stroke={(final_players && ongoing.Player1 == final_players.matche.Player1 && ongoing.Player2 == final_players.matche.Player2) ? "#388e3c" : "#FFD700"}
				/>
				<text
					x="793"
					y="215"
					fill="#FFD700"
					fontSize="12"
					textAnchor="end"
					fontFamily="IBM Plex Mono"
				>
					{final_players.matche.Player2}
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

				{/* <foreignObject
				x="6.5"
				y="8.5"
				width="37"
				height="37"
				transform="matrix(1 0 0 1 0 0)"
			>
				<div
					xmlns="http://www.w3.org/1999/xhtml"
					style={{
						width: "100%",
						height: "100%",
						borderRadius: "50%",
						overflow: "hidden",
					}}
				>
					<img
						src={hamster}
						alt="Group"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</div>
			</foreignObject> */}
				<circle
					cx="19"
					cy="19"
					r="18.5"
					transform="matrix(-1 0 0 1 1345 8)"
					stroke="#FFD700"
					fill="url(#image1)"
				/>
				<circle cx="267" cy="164" r="18.5" stroke="#FFD700" fill="url(#image1)" />
				{/* <foreignObject
				x="6.5"
				y="8.5"
				width="37"
				height="37"
				transform="matrix(1 0 0 1 0 0)"
			>
				<div
					xmlns="http://www.w3.org/1999/xhtml"
					style={{
						width: "100%",;
						height: "100%",
						borderRadius: "50%",
						overflow: "hidden",
					}}
				>
					<img
						src={hamster}
						alt="Group"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</div>
			</foreignObject> */}
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
