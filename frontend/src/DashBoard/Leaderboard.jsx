import React ,{useState, useEffect} from "react";
import { useLocation } from "react-router-dom";


function Leaderboard() {
    
    const [game_xp, setGame_XP] = useState(null);

    const location = useLocation();
    const pathname = location.pathname;
    useEffect(() => {
        const getData = async () => {
            if (pathname === '/dashboard') {
                try {
                    const response = await fetch("http://localhost:8000/auth/game_leaderboard/", {
                        method: "GET",
                        credentials: "include",
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setGame_XP(data);
                    }

                } catch (error) {
                    console.error('error getting data :', error);
                }
            }
        };
        getData();
    }, [pathname]);
    // console.log(game_xp)

    return (
        <div className="dashboard-leaderboard-item">
            <div className="leaderboard-info">
                <img src="skull.jpeg" alt="" />
                <p> #1 </p>
                <p>Oussama Redoine </p>
                <p> 19090 Xp </p>
            </div>
        </div>
    )
}
export default Leaderboard;