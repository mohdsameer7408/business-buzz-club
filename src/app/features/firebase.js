import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArTGs17TD9lgCr4kXVKEYMenrZT_-iZBw",
  authDomain: "business-buzz-club.firebaseapp.com",
  projectId: "business-buzz-club",
  storageBucket: "business-buzz-club.appspot.com",
  messagingSenderId: "784712439872",
  appId: "1:784712439872:web:c4eb4cbd785a986c2027a5",
  measurementId: "G-V5PRBXWEKY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { auth, db, storage };
