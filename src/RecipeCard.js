import React from 'react';

const RecipeCard = (props) => {

    return (
        <div className="recipe-card">
            <div className="recipe-card-inner">
                <div className="recipe-card-front">
                    <div className="image-container" >
                        <img src={ props.recipe.imageUrl } alt=""/>
                    </div>
                    <div className="recipe-front-text">
                        <h1>{ props.recipe.title }</h1>
                    </div>
                </div>
                <div className="recipe-card-back">
                    <div className="recipe-back-title" ><h1>{ props.recipe.title }</h1></div>
                    <div className="recipe-back-description" ><p> { props.recipe.description } </p></div>
                    <div className="recipe-back-author-container">
                        <div className="recipe-back-author" ><p> { props.recipe.name } </p></div>
                        <div className="recipe-back-author-pic" ><img src={ props.recipe.profilePicUrl } alt=""/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;