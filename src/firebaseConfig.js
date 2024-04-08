// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// firestore is the database in firebase


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEluMbWDlJ0HmZqyibQUKZ0gtXSH4sZaE",
  authDomain: "linkedin-clone-83988.firebaseapp.com",
  projectId: "linkedin-clone-83988",
  storageBucket: "linkedin-clone-83988.appspot.com",
  messagingSenderId: "707722835113",
  appId: "1:707722835113:web:b96cdcf4ab407d7f50e5b8",
};

// Initialize Firebase but import all the functions
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


export  { auth, app, firestore,storage };
