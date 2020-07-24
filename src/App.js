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
  const [recipes, setRecipes] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    console.log('log in status changed')
  }, [isLoggedIn])

  useEffect(() => {
    console.log('Rendered')
    if (currentDisplay === 'home') {
      getRecipes();
    }
  }, [currentDisplay])


  var recipesArray = [];

  function getRecipes() {

    recipesArray = [];

    firebase.firestore().collection('recipes').orderBy("timestamp" , "desc").limit(limit).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        recipesArray.push(doc.data());
    })
    }).then (() => {
        setRecipes(recipesArray);
    });
  };




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


  return (
    <div className="App">
      <header className="header">
        <div className="logo" onClick={() => setCurrentDisplay('home') }>
          <img src={ logo } alt="" className="logo-image"/>
        </div>
        <div className="new-recipe" title='Add Your Recipe' >
          <div className="new-recipe-icon-container" onClick={() => setCurrentDisplay('new-recipe') }>
            <i className="fa fa-camera fa-2x"></i>
            <i className="fa fa-plus-circle"></i>
          </div>
        </div>
        <div className="home" title='Home' onClick={() => setCurrentDisplay('home') }><i className="fa fa-home fa-2x"></i></div>
        <div className="log-in-out">
          { isLoggedIn ? 
            <div className="signed-in" title={ getUserName() } onClick={ signOut }>
              <img src={`${ getProfilePicUrl() }`} alt="Nothing" className="user-pic" />
            </div> :
            <div className="sign-in" title='Sign-In' onClick={ signIn }><i className="fa fa-user fa-2x"></i></div>}
        </div>
      </header>
      <div className="current-display"> 
        { currentDisplay === 'home' && <Home recipeCollection={ recipes }/>}
        { currentDisplay === 'new-recipe' && <AddNewRecipe />}
      </div>
    </div>
  );
}

export default App;


// need to create delete ability... only the user that created the recipe can delete the recipe