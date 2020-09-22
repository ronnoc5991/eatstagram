import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const Home = () => {

    const [recipes, setRecipes] = useState([]);

    function getRecipes() {
  
      var recipesArray = [];
  
      firebase.firestore().collection('recipes').orderBy("timestamp" , "desc").limit(50).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          recipesArray.push(doc.data());
      })
      }).then (() => {
          setRecipes(recipesArray);
      });
    };

    useEffect(() => {
        getRecipes();
    }, [])

    return (
        <div className="Home">

            { recipes.map((recipe, i) => {
                return <RecipeCard recipe={ recipe } key={ recipe.storageUri } />
            }) }

            {/* <div className="more-recipes-container"  >
                <div className="more-recipes-content" >
                    <div className="knife-container"><img src={ knife } alt=""/></div>
                    <div className="tomato-left tomato"><img src={tomato} alt=""/></div>
                    <div className="more-words">More</div>
                    <div className="tomato-right tomato"><img src={tomato} alt=""/></div>
                </div>
            </div> */}
        </div>
    )
}

export default Home;