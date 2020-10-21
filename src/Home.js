import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'
import { db } from './firebase'
import fridge from './fridge.png'

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [limit, setLimit] = useState(25);

    function getRecipes() {
  
      var recipesArray = [];
  
      db.collection('recipes').orderBy("timestamp" , "desc").limit(limit).get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          recipesArray.push(doc.data());
        })
      }).then (() => {
          setRecipes(recipesArray);
      });
    };

    useEffect(() => {
        getRecipes();
    }, )

    function getMoreRecipes () {
        setLimit(limit + 25);
    }

    return (
        <div className="Home">

            { recipes.map((recipe) => {
                return <RecipeCard recipe={ recipe } key={ recipe.storageUri } />
            }) }

            <div className="more-recipes" onClick={ getMoreRecipes } >
                <img src={ fridge } alt=""/>
            </div>
        </div>
    )
}

export default Home;