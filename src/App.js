import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import AddNewRecipe from './AddNewRecipe';
import logo from './eatstagram-logo.png';
import fridge from './fridge.png'
import tomato from './tomato.png'
import knife from './knife.png'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

function App() {

  const [currentDisplay, setCurrentDisplay] = useState('new-recipe');  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    console.log('log in status changed')
  }, [isLoggedIn])

  useEffect(() => {
    console.log('Rendered')
    if (currentDisplay === 'home') {
      getRecipes();
    }
  }, [currentDisplay])


  // var recipesArray = [];

  function getRecipes() {

    var recipesArray = [];

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

  function loadMoreRecipes () {
    setLimit(limit + 10);
  }

  useEffect(() => {
    getRecipes();
  }, [limit])


  return (
    <div className="App">
      <div className="filter"></div>
      
      <header className="header">
        
        <div id="logo" onClick={() => setCurrentDisplay('home') }>
          <img src={ tomato } alt="" className="logo-image"/>
          <span>Eatstagram</span>
        </div>
        
        <div className="icon-container">
          <div className="sliding-rect">
            <img src={ fridge } alt=""/>
          </div>

          <i className="fa fa-camera" title="Add Your Recipe" onClick={() => setCurrentDisplay('new-recipe') }></i>

          <i className="fa fa-home fa-lg" title='Home' onClick={() => setCurrentDisplay('home') }></i>

          { isLoggedIn ? 
            <div className="signed-in" title={ getUserName() } onClick={ signOut }>
              <img src={`${ getProfilePicUrl() }`} alt="Nothing" className="user-pic" />
            </div> :
            <div className="sign-in" title='Sign-In' onClick={ signIn }><i className="fa fa-user fa-lg"></i></div>}

        </div>

      </header>
      
      <div className="current-display"> 
        { currentDisplay === 'home' && <><Home recipeCollection={ recipes } /> 
              <div className="more-recipes-container" onClick={ loadMoreRecipes } >
                <div className="more-recipes-content" >
                  <div className="knife-container"><img src={ knife } alt=""/></div>
                  <div className="tomato-left tomato"><img src={tomato} alt=""/></div>
                  <div className="more-words">More</div>
                  <div className="tomato-right tomato"><img src={tomato} alt=""/></div>
                </div>
              </div>
            </>  }
        { currentDisplay === 'new-recipe' && <AddNewRecipe />}
      </div>
    </div>
  );
}

export default App;


// need to create delete ability... only the user that created the recipe can delete the recipe