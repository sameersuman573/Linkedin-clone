import React, { useMemo, useState } from "react";
import Connections from "../Pages/Connection";
import Topbar from "../Components/common/Topbar";
import { getCurrentUser } from "../API/FirestoreAPI";



export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});


  useMemo(() => {
    // get currentuser is a firestore function
    getCurrentUser(setCurrentUser);
  }, []);



  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Connections currentUser={currentUser} />
    </div>
  );
}
