// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpBrWsIeDtceLZS2C91zfYfusRpmaHMZw",
  authDomain: "podcast-app-react-a54ef.firebaseapp.com",
  projectId: "podcast-app-react-a54ef",
  storageBucket: "podcast-app-react-a54ef.appspot.com",
  messagingSenderId: "1048426128369",
  appId: "1:1048426128369:web:1d599fd72c06182a805a50",
  measurementId: "G-C9NLH672FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {auth,db,storage}