import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import { au } from '../../../firebase'
import './Nav.css';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    function signIn () {
      const provider = new firebase.auth.GoogleAuthProvider();
      au.signInWithPopup(provider);
    }

    function signOut () {
      au.signOut();
    }
    
    function initFirebaseAuth () {
      au.onAuthStateChanged(authStateObserver);
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
      return au.currentUser.photoURL;
    }

    function getUserName() {
      return au.currentUser.displayName;
    }

    function toggleMenu () {
      setMenuOpen(!menuOpen);
    }

    return (
      <nav className="Nav">
        <Link to="/eatstagram/" className="logo">
          Eatstagram
        </Link>
        <ul className="big-nav">
          <Link to="/eatstagram/">
            <li>
              <span>Explore</span>
              <div className="underline"></div>
            </li>
          </Link>
          <Link to="/eatstagram/create">
            <li>
              <span>Create</span>
              <div className="underline"></div>
            </li>
          </Link>
          { isLoggedIn ? 
            <li onClick={ signOut }>
              <img src={`${ getProfilePicUrl() }`} alt="Nothing" className="user-pic" title={ `${getUserName}` }/>
            </li>
            :
            <li onClick={ signIn }>
              <span>Sign-In</span>
              <div className="underline"></div>
            </li>
          }
        </ul>
        <div className="bar-container" onClick={ toggleMenu } >
            <div className={`bar bar-1 ${ menuOpen && 'open-1'}`}></div>
            <div className={`bar bar-2 ${ menuOpen && 'open-2'}`}></div>
            <div className={`bar bar-3 ${ menuOpen&& 'open-3'}`}></div>
        </div>
        <ul className={`little-nav ${ menuOpen ? 'open-nav' : 'closed-nav' }`}>
          <Link to="/eatstagram/" onClick={ toggleMenu }>
            <li>
              Explore
            </li>
          </Link>
          <Link to="/eatstagram/create" onClick={ toggleMenu }>
            <li>
                Create
            </li>
          </Link>
          { isLoggedIn ? 
            <li>
              <img src={`${ getProfilePicUrl() }`} alt="Nothing" className="user-pic" title={ getUserName } onClick={ signOut }/>
            </li>
            :
            <li onClick={ signIn }>
              Sign-In
            </li>
          }
        </ul>
      </nav>
    )
}

export default Nav
