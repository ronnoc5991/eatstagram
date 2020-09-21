import React, { useState, createContext } from 'react'
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function signIn () {
        console.log(firebase);
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    function signOut () {
        firebase.auth().signOut();
    }
    
    function initFirebaseAuth () {
    firebase.auth().onAuthStateChanged(authStateObserver);
    }
    
    initFirebaseAuth();
    
    function authStateObserver(user) {
    if (user) { // User is signed in!
        setIsLoggedIn(true);
    } else { // User is signed out!      
        setIsLoggedIn(false);
    }
    }
    
    function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL;
    }

    function getUserName() {
    return firebase.auth().currentUser.displayName;
    }

    return(
        <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}  >
            { props.children }
        </UserContext.Provider>
    );
}