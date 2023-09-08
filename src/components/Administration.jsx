import React, { useEffect, useState } from "react";
import { DashNav } from "./Index";
import { getAllCarlineParents, updateStatus, getAllPickedUp, insertPickedUp } from "../api-client";
import './Administration.css';

const Administration = () => {
  const [carlineParents, setCarlineParents] = useState([]);
  const [pickedUp, setPickedUp] = useState([]);
 

  useEffect(() => {
    const getCarline = async () => {
      try {
        const response = await getAllCarlineParents();
        setCarlineParents(response);

        const nextResp = await getAllPickedUp();
        setPickedUp(nextResp)
  
      } catch (error) {
        console.error("Error fetching carline parents:", error);
      }
    };
    getCarline();
  }, []);
  


  const handleStatusChange = async (userId, children) => {
    const currentStatus = 'Not in line';
    await updateStatus(currentStatus, userId);
    await insertPickedUp(userId, children);
    
    const updated = await getAllCarlineParents();
    setCarlineParents(updated);

    const newPickedUp = await getAllPickedUp();
    setPickedUp(newPickedUp);
    
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
  
    return `${month}/${day}/${year}`;
  };
  

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString(undefined, options);
  };

  const today = formatDate(new Date());
  const filteredPickedUp = pickedUp.filter((item) => {
    return formatDate(item.pickedupdate) === today;
  });


  return (

    <div id='admin-page'>
      <DashNav />
      <div id="dashboard-admin">
        <h2 id="school-name">Pierre Part Elementary School</h2>
        <h3 id='queue-heading'>Queue</h3>
        {carlineParents.length ? (
          <div className='ind-parent'>
            {carlineParents.map((child) => (
            <li key={child.id}>
            {child.children}
            <p><strong>Parent: </strong>{child.firstname} {child.lastname}</p>
            <hr></hr>
            <p className='pickedup'>Picked up?</p><input className='pickedup' type='checkbox' onChange={() => handleStatusChange(child.id, child.children)} id='checkbox' key={child.id}/>
            </li>
          ))}
        </div>
        ) : (
          <div>
            <hr></hr>
            <h3 id='queue-heading'>No one in line!</h3>
          </div>
          
        )}
        
        <div id='pickedup-list'>
          <h3 id='pickedup-heading'>Today's Roster</h3>
          {filteredPickedUp.length ? (
          <div>
            {filteredPickedUp.map((name) => (
              <li key={name.id} className='pickedup-ind'>
                {name.allChildren} | {`${formatDate(name.pickedupdate)}`} | {`${formatTime(name.pickedupdate)}`}
              </li>
            ))}
          </div>
        ) : (
          <div>
            <hr></hr>
            <h3 id='queue-heading'>No pickups for today.</h3>
          </div>
        )}
        </div>
      </div>
    </div>

    
  );
};

export default Administration;
