import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import AddNewRecipe from './AddNewRecipe';
import logo from './eatstagram-logo.png';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

function App() {

  const [currentDisplay, setCurrentDisplay] = useState('home');  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('log in status changed')
  }, [isLoggedIn])

  function changeView (e) {
    console.log(`${ e.target.className }`)
    setCurrentDisplay(e.target.className);
  }

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
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();
      // Set the user's profile pic and name.
      // Show user's profile and sign-out button.
      setIsLoggedIn(true);
      // Hide sign-in button.
      // We save the Firebase Messaging Device token and enable notifications.
    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      
      // Show sign-in button.
      setIsLoggedIn(false);
    }
  }

  function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL;
  }

  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  function isUserSignedIn() {
    //this returns true is a user is signed in.... maybe that state takes care of this job?
    return !!firebase.auth().currentUser;
  }

  return (
    <div className="App">
      <header className="header">
        <div className="logo" onClick={ changeView }>
          {/* <img src={ logo } alt="" className="logo-image"/> */}
          Eatstagram
        </div>
        <div className="home" onClick={ changeView }>Home</div>
        <div className="new-recipe" onClick={ changeView } display={ {viewChanger:[currentDisplay, setCurrentDisplay]} }>New Recipe</div>
        <div className="log-in-out">
          { isLoggedIn ? 
            <div className="signed-in" onClick={ signOut }>
              <div className="user-name" > { `${getUserName()}` } </div>
              <img src={`${ getProfilePicUrl() }`} alt="Nothing" className="user-pic" />
            </div> :
            <div className="sign-in" onClick={ signIn }>Sign-In</div>}
        </div>
      </header>
      <div className="current-display"> 
        { currentDisplay === 'logo' && <Home />}
        { currentDisplay === 'home' && <Home />}
        { currentDisplay === 'new-recipe' && <AddNewRecipe />}
      </div>
    </div>
  );
}

export default App;
