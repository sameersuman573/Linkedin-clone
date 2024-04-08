import React, { useEffect, useState } from "react";
import { getConnections } from "../../../API/FirestoreAPI";
import { IoAddOutline } from "react-icons/io5";



// we need to just print the name and data of the user
export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // user is the target id and current user is the id of the user who is logged in
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);



  return isConnected ? (
    // IS connected is passed to getconnections as a prop
    <></>
  ) : 
  // show all users who are not connected
  (
    <div className="grid-child" >

      <img src={user.imageLink} />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>

{/* getcurrentuser is a function in firebase */}

      <button onClick={() => getCurrentUser(user.id)}>
        <IoAddOutline size={20} />
        Connect
      </button>

    </div>
  );
}
