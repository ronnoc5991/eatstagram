import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlYTr2m_KQr8hEvGBzbACIJW9-Uo49ylo",
  authDomain: "eatstagram-bbe34.firebaseapp.com",
  databaseURL: "https://eatstagram-bbe34.firebaseio.com",
  projectId: "eatstagram-bbe34",
  storageBucket: "eatstagram-bbe34.appspot.com",
  messagingSenderId: "421748087924",
  appId: "1:421748087924:web:10483226f13dbcaacd0521",
  measurementId: "G-J3RM4ZBDXC"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
