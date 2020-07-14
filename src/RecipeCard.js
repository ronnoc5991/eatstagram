import React from 'react';

const RecipeCard = (props) => {

    return (
        <div className="recipe-card">
            <div className="recipe-card-inner">
                <div className="recipe-card-front">
                    <img src="" alt=""/>
                    <div className="recipe-front-text">
                        <h1>{ props.recipe.title }</h1>
                    </div>
                </div>
                <div className="recipe-card-back">
                    <h1>{ props.recipe.title }</h1>
                    <p> { props.recipe.description } </p>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;