import React, { useState } from 'react';
import './LeaderBoard.css';
import { FaCrown } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";


const LeaderBoard = () => {
  const [scores, setScores] = useState([
    {srno:1, team: 'A', score: 0 },
    { srno:2,team: 'B', score: 0 },
    {srno:3, team: 'C', score: 0 },
    {srno:4, team: 'D', score: 0},
    {srno:5, team: 'E', score: 0 },
    {srno:6, team: 'F', score: 0 },
    { srno:7,team: 'G', score: 0 },
    { srno:8,team: 'H', score: 0 },




  ]);

  const handleScoreChange = (team, increment) => {
    setScores((prevScores) =>
      prevScores.map((score) =>
        score.team === team ? { ...score, score: score.score + increment } : score
      )
    );
  };

  return (
    <div class ="backg">
      <h1 > Scoreboard</h1>
      <table className="scoreboard">
        <thead >
          <tr >
            <th id="t1"> Position </th>
            <th id="t2">Team  </th>
            <th id="t3">Score  </th>
          </tr>
        </thead>
        <tbody >
        
          {scores.map((score) => (
            
            <tr key={score.team}>
              <div class="blue">
               <td id="text" >
                {score.srno}
                <p id='yellow'><FaCrown /></p>
               
              </td>
              <td id="text1">
               
                {score.team}</td>
              <td id='text2'>
              <p id='trophy'><FaTrophy /></p>{score.score}
             </td>
              </div>
            
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
