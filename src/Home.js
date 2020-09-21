import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import tomato from './tomato.png'
import knife from './knife.png'

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [limit, setLimit] = useState(20);
    const [displayStyle, setDisplayStyle] = useState(true);
  

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
  
    function loadMoreRecipes () {
      setLimit(limit + 10);
    }
  
    useEffect(() => {
      getRecipes();
    }, [limit])

    useEffect(() => {
        getRecipes();
        console.log(recipes)
    }, [])

    return (
        <div className={`Home ${ displayStyle ? 'grid-display' : 'gallery-display' }`}>
            <div className="filter"></div>

            { recipes.map((recipe, i) => {
                return <RecipeCard recipe={ recipe } />
            }) }

            <div className="more-recipes-container" onClick={ loadMoreRecipes } >
                <div className="more-recipes-content" >
                    <div className="knife-container"><img src={ knife } alt=""/></div>
                    <div className="tomato-left tomato"><img src={tomato} alt=""/></div>
                    <div className="more-words">More</div>
                    <div className="tomato-right tomato"><img src={tomato} alt=""/></div>
                </div>
            </div>
        </div>
    )
}

export default Home;