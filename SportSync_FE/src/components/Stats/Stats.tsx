
// CSS
import StatsCSS from "./Stats.module.css";

// Icons
import { Place, Sell, InsertInvitation } from "@mui/icons-material"


// Interfaces
import Rating from "../../interfaces/Rating";
import React, { useEffect, useState } from "react";
import axios from "axios";





interface Props {
    username: string; // Add the username prop
}

function Stats({ username }: Props) {
    const [stats, setStats] = useState<Rating | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStats  = async () => {
            try {
                const response = await axios.get(`http://86.125.232.27:8090/users/stats/${username}`);
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
           
         };
         getStats();
       

   }, [username]);

    return (
        <div className={StatsCSS.statistics_container}>
        {stats && (
                <>
                    <div className={StatsCSS.stats_container}>
                        <p>Pace </p>
                        <p>{stats.pace}</p>
                    </div>
                    <div className={StatsCSS.stats_container}>
                        <p>Shooting </p>
                        <p>{stats.shooting}</p>
                    </div>
                    <div className={StatsCSS.stats_container}>
                        <p>Passing </p>
                        <p>{stats.passing}</p>
                    </div>
                    <div className={StatsCSS.stats_container}>
                        <p>Dribbling </p>
                        <p>{stats.dribbling}</p>
                    </div>
                    <div className={StatsCSS.stats_container}>
                        <p>Defending </p>
                        <p>{stats.defending}</p>
                    </div>
                    <div className={StatsCSS.stats_container}>
                        <p>Physical </p>
                        <p>{stats.physical}</p>
                    </div>
                </>
            )}
    </div>
    );
}

export default Stats;