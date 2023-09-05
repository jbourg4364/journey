import React, { useState, useEffect } from "react";
import { DashNav } from "./Index";
import "./Dashboard.css";
import { getStatus, updateStatus } from "../api-client";

const Dashboard = ({ setIsLoggedIn, setUser, setToken }) => {
  const [joinView, setJoin] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const getCurrentStatus = async () => {
      const response = await getStatus(userId);
      setCurrentStatus(response);
    };
    getCurrentStatus();
  }, []);

  const handleJoin = async () => {
    await updateStatus("In line", userId);
    const status = await getStatus(userId);
    setCurrentStatus(status);
  };

  useEffect(() => {
    if (currentStatus.status == "In line") {
      setJoin(false);
    }
  });

  const handleExit = async () => {
    const result = window.confirm(
      "Are you sure you want to get out of car line?"
    );

    if (result) {
      window.alert("You have been taken out of car line!");
      await updateStatus("Not in line", userId);
      const status = await getStatus(userId);
      setCurrentStatus(status);
      setJoin(true);
    } else {
      // The user clicked "Cancel" (No) or closed the dialog - do nothing or handle it as needed.
    }
  };

  return (
    <div>
      <DashNav
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setToken={setToken}
      />
      <div id="dashboard">
        <h2 id="school-name">Pierre Part Elementary School</h2>
        <div className="status-container">
          <h3>Current Status:</h3>
          <h3 id="status">{currentStatus.status}</h3>
        </div>
        {joinView ? (
          <button id="join-button" onClick={handleJoin}>
            Join Car Line!
          </button>
        ) : (
          <button id="join-button" className="exit" onClick={handleExit}>
            Cancel Pickup
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
