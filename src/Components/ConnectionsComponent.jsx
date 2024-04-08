import React, { useEffect, useState } from "react";
import "../Sass/ConnectionsComponent.scss";
// to get all users
import {
  getAllUsers,
  addConnection,
  getConnections,
} from "../API/FirestoreAPI";
import ConnectedUsers from "./common/Connectedusers";


function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);


  const getCurrentUser = (id) => {
    // ERROR CAN BE HERE
    // console.log(id); NOT RAN
    addConnection(currentUser.id, id);
  };



  useEffect(() => {
    getAllUsers(setUsers);
  });


  // ERROR CAN BE HERE

  

  return (


    <div className="connections-main">
      {users.map((user) => {
        {
          /* to hide curent user */
        }
        return <ConnectedUsers
        currentUser={currentUser}
        user={user} 
        getCurrentUser={getCurrentUser}

       
       
         />;
      })}
    </div>
  );
}

export default ConnectionsComponent;
