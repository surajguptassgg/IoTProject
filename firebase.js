import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBlzMktJ8B9JWJ-ZwuhDzXf1cGaWVHBaok",
  authDomain: "iotproject-f148b.firebaseapp.com",
  databaseURL:
    "https://iotproject-f148b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iotproject-f148b",
  storageBucket: "iotproject-f148b.appspot.com",
  messagingSenderId: "120776921598",
  appId: "1:120776921598:web:44d37b6ffd72f4090670af",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;
