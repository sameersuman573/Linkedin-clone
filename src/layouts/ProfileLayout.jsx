import React, { useState, useMemo } from "react";
import { getCurrentUser } from "../API/FirestoreAPI";
import Topbar from "../Components/common/Topbar";
import Profile from "../Pages/Profile";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      {/*As in the homelayout also the top will always be displyed */}
      <Topbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
}
