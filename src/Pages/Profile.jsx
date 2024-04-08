import React, { useState, useEffect } from "react";
import ProfileComponent from "../Components/ProfileComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loader from "../Components/common/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Profile({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        // if the access token is not here go back to login page
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
}
