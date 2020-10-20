import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDlYTr2m_KQr8hEvGBzbACIJW9-Uo49ylo",
    authDomain: "eatstagram-bbe34.firebaseapp.com",
    databaseURL: "https://eatstagram-bbe34.firebaseio.com",
    projectId: "eatstagram-bbe34",
    storageBucket: "eatstagram-bbe34.appspot.com",
    messagingSenderId: "421748087924",
    appId: "1:421748087924:web:10483226f13dbcaacd0521",
    measurementId: "G-J3RM4ZBDXC"
});


export const db = app.firestore();
export const st = app.storage();
export const au = app.auth();

export default app;