import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const RecipeCard = (props) => {

    var recipeCard = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(recipeCard, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1})
    }, [])

    return (
        <div className="recipe-card" ref={ (el) => { recipeCard = el } }>
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