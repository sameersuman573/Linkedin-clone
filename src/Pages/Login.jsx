import React from "react";
import LoginComponent from "../Components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { icons } from "antd/es/image/PreviewGroup";
import Loader from "../Components/common/Loader/Loader"
import { useState } from "react";
import {auth} from "../firebaseConfig"

export default function Login() {
  const [loading, setloading] = useState(true);
  let navigate = useNavigate();
  
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setloading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <LoginComponent />;
}
