import React, { useEffect, useState } from "react";
import "./LeaderBoard.css";
import { FaTrophy } from "react-icons/fa6";
import axios from "axios";
import polkadot from "./Images/polkadotpattern.jpg";
import { Link } from "react-router-dom";

const LeaderBoard = (props) => {
  const { ipaddress } = props;
  const id = "65a36e1741792a13854f33e0";
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `http://${ipaddress}:8005/gamedetails/${id}`
        );
        const sortedTeams = response.data.teamscores.sort(
          (a, b) => b.points - a.points
        );
        setScores(sortedTeams);
      } catch (error) {
        console.log(error);
        // Handle error, maybe set an error state
      }
    };
    fetchTeam();
    const intervalId = setInterval(fetchTeam, 2000);

    // Clean up interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Check if scores are empty, display loading or placeholder content
  if (scores.length === 0) {
    return <div>Loading...</div>; // You can replace this with a loading indicator or other content
  }

  return (
    <div id="LeaderBoard">
      <div id="container">
        <img src={polkadot} alt="" />
        <div className="grid-title1">
          <div></div>
          <div>LeaderBoard</div>
          <div></div>
        </div>
        <div className="grid-title">
          <div>Sr.No</div>
          <div>Team Name</div>
          <div>Points</div>
        </div>
        {scores.map((team, index) => (
          <div>
            <div>{index + 1}</div>
            <div>
              {" "}
              <Link to={`/controller/${team._id}`}> {team.name}</Link>{" "}
            </div>
            <div>
              {<FaTrophy className="trophy-icon" />}
              {team.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
