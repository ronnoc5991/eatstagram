import React, { useState } from 'react';

const AddNewRecipe = () => {

    const [recipeTitle, setRecipeTitle] = useState('');    
    const [recipeDescription, setRecipeDescription] = useState('');

    function createRecipe (e) {
        e.preventDefault();
        console.log(`Recipe Title: ${ recipeTitle }`)
        console.log(`Recipe Description: ${ recipeDescription }`)
        setRecipeTitle('');
        setRecipeDescription('');
    }

    function changeRecipeTitle (e) {
        setRecipeTitle(e.target.value);
    }

    function changeRecipeDescription (e) {
        setRecipeDescription(e.target.value);
    }

    return (
        <div className="new-recipe-view">
            <form className="recipe-form" >
                <label htmlFor="title" className="form-title" >
                    Title:
                    <input type="text" name="title" autoComplete="off" value={ recipeTitle } onChange={ changeRecipeTitle } />
                </label>
                <label htmlFor="photo" className="form-photo" >
                    Photo:
                    <input type="file" name="photo" autoComplete="off" />
                </label>
                <label htmlFor="description" className="form-description" >
                    Description:
                    <input type="textarea" name="description" autoComplete="off" value={ recipeDescription } onChange={ changeRecipeDescription } />
                </label>
                <button onClick={ createRecipe } className="submit-button" >Create</button>
            </form>

            <div className="draft-recipe-card-container">
                <div className="draft-recipe-title"> {recipeTitle} </div>
            </div>
        </div>
    )
}

export default AddNewRecipe;