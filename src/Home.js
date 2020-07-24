import React from 'react';
import RecipeCard from './RecipeCard'

const Home = (props) => {
  
    return (
        <div className="home-view">
            { props.recipeCollection.map((recipe, i) => {
                return <RecipeCard recipe={ recipe } />
            }) }
        </div>
    )
}

export default Home;