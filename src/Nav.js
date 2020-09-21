import React, { useState } from 'react'
import tomato from './tomato.png'
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Link } from 'react-router-dom';

function Nav() {

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

    return (
        <div className="Nav">
            <header>
                <Link to="/">
                    <div id="logo">
                        <img src={ tomato } alt="" className="logo-image"/>
                        <span>Eatstagram</span>
                    </div>
                </Link>
                
                <ul>

                    <Link to="/">
                        <li>
                            <h3>Explore</h3>
                            <div className="underline"></div>
                        </li>
                    </Link>

                    <Link to="/create">
                        <li>
                            <h3>Create</h3>
                            <div className="underline"></div>
                        </li>
                    </Link>

                    <li>
                        { isLoggedIn ? 
                        <img src={`${ getProfilePicUrl }`} alt="Nothing" className="user-pic" title={ getUserName } onClick={ signOut }/>
                        :
                        <>
                        <h3 title='Sign-In' onClick={ signIn }>Sign-In</h3>
                        <div className="underline"></div>
                        </>
                        }
                    </li>

                </ul>

            </header>
        </div>
    )
}

export default Nav
