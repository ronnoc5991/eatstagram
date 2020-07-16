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
    const [recipePhoto, setRecipePhoto] = useState(null);


    //I want the display to change to home Display upon Recipe Creation

    function createRecipe (e) {
        e.preventDefault();
        saveRecipeWithImage(recipeTitle, recipeDescription, recipePhoto);
        setRecipeTitle('');
        setRecipeDescription('');
        setRecipePhoto('')
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

    function handlePhotoChange (e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            console.log(image);
            setRecipePhoto(image);
        }
    }

    function saveRecipeWithImage (title, description, file) {
        firebase.firestore().collection('recipes').add({
            name: getUserName(),
            title: title,
            description: description,
            imageUrl: 'LOADING_IMAGE_URL',
            profilePicUrl: getProfilePicUrl(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function(messageRef) {
            var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
            return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
                return fileSnapshot.ref.getDownloadURL().then((url) => {
                    return messageRef.update({
                        imageUrl: url,
                        storageUri: fileSnapshot.metadata.fullPath
                    });
                });
            });
        }).catch(function(error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        })
    }

    function isUserSignedIn() {
        //this returns true is a user is signed in.... maybe that state takes care of this job?
        return !!firebase.auth().currentUser;
      }

    return (
        <div className="new-recipe-view">
            <form className="recipe-form" >
                <label htmlFor="title" className="form-title" >
                    Title:
                    <input type="text" name="title" maxLength="18" autoComplete="off" value={ recipeTitle } onChange={ changeRecipeTitle } />
                </label>
                <label htmlFor="photo" className="form-photo" >
                    Photo:
                    <input type="file" name="photo" autoComplete="off" onChange= { handlePhotoChange } />
                </label>
                <label htmlFor="description" className="form-description" >
                    Description:
                    <textarea name="description" id="description" cols="25" rows="10" autoComplete="off" value={ recipeDescription } onChange={ changeRecipeDescription } ></textarea>
                </label>
                <button onClick={ createRecipe } className="submit-button" >Create</button>
            </form>

            <div className="draft-recipe-card-container">
                <div className="recipe-card-creation">
                    <div className="recipe-card-inner-creation">
                        
                        <div className="recipe-card-front-creation">
                            <div className="image-container-creation" >
                                <img src={ recipePhoto ? recipePhoto : '' } alt=""/>    
                                {/* how to create a life view of the photo on upload? */}
                            </div>
                            <div className="recipe-front-text-creation">
                                <h1> { recipeTitle } </h1>
                            </div>
                        </div>
                        
                        <div className="recipe-card-back-creation">
                            <div className="recipe-back-title-creation" ><h1>{ recipeTitle }</h1></div>
                            <div className="recipe-back-description-creation" ><p> { recipeDescription } </p></div>
                            <div className="recipe-back-author-container-creation">
                                <div className="recipe-back-author-creation" ><p> { isUserSignedIn() ? getUserName() : 'YOUR NAME HERE' } </p></div>
                                <div className="recipe-back-author-pic-creation" > { isUserSignedIn() ? <img src={getProfilePicUrl()} alt=""/> : <i className="fa fa-user fa-5x"></i> } </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddNewRecipe;