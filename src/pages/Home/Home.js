import React, { useState, useEffect } from 'react';
import './Home.css';
import Card from '../../components/molecules/Card/Card'
import { db } from '../../firebase'
import fridge from '../../assets/image/fridge.png'

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [limit, setLimit] = useState(25);

    function getRecipes() {
  
      let recipesArray = [];
  
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
    }, []) //eslint-disable-line

    function getMoreRecipes () {
        setLimit(limit + 25);
        getRecipes();
    }

    return (
        <div className="Home">

            { recipes.map((recipe) => {
                return <Card recipe={ recipe } key={ recipe.storageUri } />
            }) }

            <div className="more-recipes" onClick={ getMoreRecipes } >
                <img src={ fridge } alt=""/>
            </div>
        </div>
    )
}

export default Home;