import React, { useState, useContext } from 'react'
import tomato from './tomato.png'
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext'; 

function Nav() {

    const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);


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

    function toggleMenu () {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="Nav">
            <header>
                <Link to="/eatstagram/">
                    <div id="logo">
                        {/* <img src={ tomato } alt="" className="logo-image"/> */}
                        <span>Eatstagram</span>
                    </div>
                </Link>
                
                <ul className="big-nav">

                    <Link to="/eatstagram/">
                        <li>
                            <h3>Explore</h3>
                            <div className="underline"></div>
                        </li>
                    </Link>

                    <Link to="/eatstagram/create">
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

                <div className="bar-container" onClick={ toggleMenu } >
                    <div className={`bar ${ menuOpen ? 'open-1' : 'bar-1' }`}></div>
                    <div className={`bar ${ menuOpen ? 'open-2' : 'bar-2' }`}></div>
                    <div className={`bar ${ menuOpen ? 'open-3' : 'bar-3' }`}></div>
                </div>

                <ul className={`little-nav ${ menuOpen ? 'open-nav' : 'closed-nav' }`}>

                    <Link to="/eatstagram/" onClick={ toggleMenu }>
                        <li>
                            <h3>Explore</h3>
                        </li>
                    </Link>

                    <Link to="/eatstagram/create" onClick={ toggleMenu }>
                        <li>
                            <h3>Create</h3>
                        </li>
                    </Link>

                    <li>
                        { isLoggedIn ? 
                        <img src={`${ getProfilePicUrl }`} alt="Nothing" className="user-pic" title={ getUserName } onClick={ signOut }/>
                        :
                        <>
                        <h3 onClick={ signIn }>Sign-In</h3>
                        </>
                        }
                    </li>
                </ul>

            </header>
        </div>
    )
}

export default Nav
