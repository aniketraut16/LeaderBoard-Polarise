import React, { useEffect, useState } from "react";
import "./Controller.css";
import ControllerImg from "./Images/controller.png";
import axios from "axios";
import { useParams } from "react-router-dom";

function Controller(props) {
  const { ipaddress } = props;
  const { id } = useParams();
  const [teamname, setteamname] = useState("");
  const [teampoints, setteampoints] = useState(0);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `http://${ipaddress}:8005/teamdetails/${id}`
        );
        setteamname(response.data.Team.name);
        setteampoints(response.data.Team.points);
        console.log(response.data.Team.name);
      } catch (error) {
        console.log(error);
        return "Internal server error";
      }
    };

    fetchTeam();
  }, []);

  const updatePoints = async () => {
    try {
      await axios.put(`http://${ipaddress}:8005/updateteam`, {
        id,
        points: teampoints,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Controller">
      <h1>{teamname}</h1>
      <div>
        <input
          type="number"
          name=""
          id=""
          value={teampoints}
          onChange={(e) => {
            setteampoints(e.target.value);
          }}
        />
        <img src={ControllerImg} alt="" />
      </div>
      <button className="btn" type="button" onClick={updatePoints}>
        <strong>UPDATE</strong>
        <div id="container-stars">
          <div id="stars" />
        </div>
        <div id="glow">
          <div className="circle" />
          <div className="circle" />
        </div>
      </button>
    </div>
  );
}

export default Controller;
