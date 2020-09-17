import firebase from "firebase";
import "firebase/storage";

export const fireApp = firebase.initializeApp({
  projectId: "my-trivia-446f8",
  appId: "1:949749598824:web:d1662dbf24f2eb263689dd",
  databaseURL: "https://my-trivia-446f8.firebaseio.com",
  storageBucket: "my-trivia-446f8.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyA0B6kWWzgb_epQZOTKX88uJX1ZT_N6-vs",
  authDomain: "my-trivia-446f8.firebaseapp.com",
  messagingSenderId: "949749598824",
  measurementId: "G-WNMY379QNN",
});
