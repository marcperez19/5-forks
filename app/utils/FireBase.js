import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDfwoSuCTPqTnsKBwBoQ4aGnnSmggcChQk",
  authDomain: "forks-1ce2b.firebaseapp.com",
  databaseURL: "https://forks-1ce2b.firebaseio.com",
  projectId: "forks-1ce2b",
  storageBucket: "forks-1ce2b.appspot.com",
  messagingSenderId: "231975164954",
  appId: "1:231975164954:web:44b302d64ed7527c"
};

export const firebaseapp = firebase.initializeApp(firebaseConfig);
