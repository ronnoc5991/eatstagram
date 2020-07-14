import React, { useState } from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const AddNewRecipe = () => {

    const [recipeTitle, setRecipeTitle] = useState('');    
    const [recipeDescription, setRecipeDescription] = useState('');


    //I want the display to change to home Display upon Recipe Creation

    function createRecipe (e) {
        e.preventDefault();
        console.log(`Recipe Title: ${ recipeTitle }`)
        console.log(`Recipe Description: ${ recipeDescription }`)
        saveRecipe(recipeTitle, recipeDescription);
        setRecipeTitle('');
        setRecipeDescription('');

    }

    function changeRecipeTitle (e) {
        setRecipeTitle(e.target.value);
    }

    function changeRecipeDescription (e) {
        setRecipeDescription(e.target.value);
    }

    function getUserName() {
        return firebase.auth().currentUser.displayName;
    }

    function getProfilePicUrl() {
        return firebase.auth().currentUser.photoURL;
    }

    function saveRecipe (title, description) {
        return firebase.firestore().collection('recipes').add({
            name: getUserName(),
            title: title,
            description: description,
            profilePicUrl: getProfilePicUrl(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function(error) {
            console.error('Error writing new message to database', error);
        });
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