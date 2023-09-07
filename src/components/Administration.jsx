import React, { useEffect, useState } from "react";
import { DashNav } from "./Index";
import { getAllCarlineParents, updateStatus } from "../api-client";
import './Administration.css';

const Administration = () => {
  const [carlineParents, setCarlineParents] = useState([]);
  // const [pickedUp, setPickedUp] = useState([]);

  useEffect(() => {
    const getCarline = async () => {
      try {
        const response = await getAllCarlineParents();
        setCarlineParents(response);
      } catch (error) {
        console.error("Error fetching carline parents:", error);
      }
    };
    getCarline();
  }, []);
  

  const handleStatusChange = async (userId) => {
    const currentStatus = 'Not in line';
    await updateStatus(currentStatus, userId);
    const updated = await getAllCarlineParents();
    setCarlineParents(updated)
  
  }

  return (

    <div id='admin-page'>
      <DashNav />
      <div id="dashboard">
        <h2 id="school-name">Pierre Part Elementary School</h2>
        <h3 id='queue-heading'>Queue</h3>
        <div className='ind-parent'>
            {carlineParents.map((child) => (
            <li key={child.id}>
            {child.children}
            <p><strong>Parent: </strong>{child.firstname} {child.lastname}</p>
            <hr></hr>
            <p className='pickedup'>Picked up?</p><input className='pickedup' type='checkbox' onChange={() => handleStatusChange(child.id)} id='checkbox'/>
            </li>
          ))}
         
        </div>
      </div>
    </div>

    
  );
};

export default Administration;
