import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ConnectionsComponent from "../Components/ConnectionsComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../Components/common/Loader/Loader";


export default function Connections({ currentUser }) {

  const [loading, setloading] = useState(false);

  let navigate = useNavigate;
  
  
  //  LOADING SCREEN EFFECT



  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      // console.log(res);
      if (!res?.accessToken) {
        // if the access token is not here go back to login page
        navigate("/");
      } else {
        setloading(false);
      }
    }
    );
  }, []);


  // usetate main functionality is being used here
  // if loading is true then show loader if false show homecomponenet
  return loading ? <Loader/> : <ConnectionsComponent currentUser={currentUser} />;
}
