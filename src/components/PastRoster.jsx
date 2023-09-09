import React, { useState, useEffect } from "react";
import { DashNav } from "./Index";
import "./PastRoster.css";
import { getHistory } from "../api-client";


const PastRoster = () => {
  const [sortedDates, setSortedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [pickedUp, setPickedUp] = useState([]);
 
  useEffect(() => {
    const getPickedUp = async () => {
      try {
        const nextResp = await getHistory();
        setPickedUp(nextResp);
      } catch (error) {
        console.error("Error fetching carline parents:", error);
      }
    };
    getPickedUp();
  }, []);



  useEffect(() => {
    const uniqueDates = new Set();
    // Extract unique dates from the pickedUp array and store them in the Set
    pickedUp.forEach((item) => {
      const formattedDate = formatDate(item.pickedupdate);
      uniqueDates.add(formattedDate);
    });
    // Convert the Set back to an array and sort it
    const sortedDatesArray = Array.from(uniqueDates).sort();
    // Update the state with sorted dates
    setSortedDates(sortedDatesArray);
  }, [pickedUp]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
    return `${month}/${day}/${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString(undefined, options);
  };

  const filteredPickedUp = isSelectedDate
  ? pickedUp.filter((item) => formatDate(item.pickedupdate) === selectedDate)
  : [];


  const handleChange = (e) => {
    setSelectedDate(e);
    setIsSelectedDate(true);
  }

  return (
    <>
    <DashNav />
    <div id="past-roster-container">
      <h2 id="school-name">Pierre Part Elementary School</h2>
      <h3 id="queue-heading">History</h3>
      <select
        className="dropdown"
        placeholder="Date"
        value={selectedDate}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option>Select Date</option>
        {sortedDates.map((date, index) => (
          <option key={index}>{`${formatDate(date)}`}</option>
        ))}
      </select>
      <hr />
      {isSelectedDate ? (
        <div>
          {filteredPickedUp.map((child, index) => (
            <li className="pickedup-history" key={index}>
              {child.allChildren} | {`${formatTime(child.pickedupdate)}`}
            </li>
          ))}
        </div>
      ) : null}
    </div>
  </>
  );
};

export default PastRoster;
