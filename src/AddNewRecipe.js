import React, { useState, useRef, useCallback, useEffect } from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import ReactCrop from 'react-image-crop'
import "react-image-crop/dist/ReactCrop.css";
import {base64StringtoFile, extractImageFileExtensionFromBase64} from './ReusableUtils'


const AddNewRecipe = () => {

    const [recipeTitle, setRecipeTitle] = useState('');    
    const [recipeDescription, setRecipeDescription] = useState('');
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const pixelRatio = 4;



    //I want the display to change to home Display upon Recipe Creation

    function createRecipe (e) {
        e.preventDefault();
        const photo = preparePhotoForUpload();
        saveRecipeWithImage(recipeTitle, recipeDescription, photo);
        setSubmitted(true);
        // setRecipeTitle('');
        // setRecipeDescription('');
        // setRecipePhoto('')
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

    function nextStep (e) {
        e.preventDefault();
        setStep(step + 1);
    }

    function previousStep (e) {
        e.preventDefault();
        setStep(step - 1);
    }

    function nextStepPossible () {
        if (step === 1 && upImg ) {
            return true
        } else if (step === 2 && recipeTitle !== '') {
            return true
        } else if (step === 3 && recipeDescription) {
            return true
        } else {
            return false
        }
    }

    function previousStepPossible () {
        if (step > 1  && !submitted) {
            return true;
        } else {
            return false;
        }
    }

    function needToSignIn () {
        if ( step === 4 && !isUserSignedIn()) {
            return true
        }  else {
            return false
        }
    }

// --------------------------------------------------------------------------------------------------------------------------------------------

const [upImg, setUpImg] = useState();
const imgRef = useRef(null);
const previewCanvasRef = useRef(null);
const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
const [completedCrop, setCompletedCrop] = useState(null);

const onSelectFile = e => {
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
        setUpImg(reader.result);
        preparePhotoForUpload();
    });
    reader.readAsDataURL(e.target.files[0]);
  }
};

const onLoad = useCallback(img => {
  imgRef.current = img;
}, []);

useEffect(() => {
  if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
    return;
  }

  const image = imgRef.current;
  const canvas = previewCanvasRef.current;
  const crop = completedCrop;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
}, [completedCrop]);


function preparePhotoForUpload () {
    if(upImg) {
        const fileExtension = extractImageFileExtensionFromBase64(upImg);
        const myFileName = 'recipePhoto.' + fileExtension;
        const canvasRef = previewCanvasRef.current
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension)

        const myCroppedFile = base64StringtoFile(imageData64, myFileName);
        console.log(myCroppedFile);
        return myCroppedFile;
    }
}
// --------------------------------------------------------------------------------------------------------------------------------------------


    return (
        <div className="new-recipe-view">
            { needToSignIn() && <div className="sign-in-arrow"><i className="fa fa-arrow-up fa-4x"></i></div> }
            <form className="recipe-form" >
                <div className="recipe-creation-header"> <h2>Recipe Creation Station</h2></div>

                { (step === 2) && <label htmlFor="title" className="form-title" >
                    <h2>Step 2</h2>
                    Give your recipe a name...
                    <input type="text" name="title" maxLength="21" autoComplete="off" value={ recipeTitle } onChange={ changeRecipeTitle } />
                </label> }

                { (step === 1) &&  <label htmlFor="photo" className="form-photo" >
                    <h2>Step 1</h2>
                    Upload a photo of your dish...
                            <input type="file" accept="image/*" onChange={onSelectFile} />
                        <div className="crop-container">
                            <ReactCrop
                                src={upImg}
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={c => setCrop(c)}
                                onComplete={c => setCompletedCrop(c)}
                            />
                        </div>
                </label>}

                { (step === 3) && <label htmlFor="description" className="form-description" >
                    <h2>Step 3</h2>
                    Give a short description of your dish...
                    <textarea name="description" id="description" cols="25" rows="10" autoComplete="off" value={ recipeDescription } onChange={ changeRecipeDescription } ></textarea>
                </label>}

                { step === 4 && (<div className="create-button-container">
                            <h2>Step 4</h2>
                            { submitted ? 'You have published your recipe!' : (isUserSignedIn() ? 'Publish your recipe!' : 'Please sign-in to share your recipe.')}
                            {/* { isUserSignedIn() ? 'Publish your recipe!' : 'Please sign-in to share your recipe.' } */}
                            <div> { isUserSignedIn() ?
                              <button onClick={ submitted ? '' : createRecipe } className="submit-button" ><div className="submit-button-inner"> { submitted ? '' : <> <div className="flashers flasher-1"></div><div className="flashers flasher-2"></div><div className="flashers flasher-3"></div> </> }</div></button> 
                            : <button className="submit-button-fake" > <div></div></button>  } </div>   
                                </div>) } 


                <div className="form-button-container">
                    { previousStepPossible() ? <div className="previous-step-button"><i className="fa fa-arrow-left fa-2x" onClick={ previousStep }></i></div> : ''}
                    { nextStepPossible() ? <div className="next-step-button" ><i className="fa fa-arrow-right fa-2x" onClick={ nextStep }></i></div> : '' }
                </div>
            </form>

            <div className="draft-recipe-card-container">
                <div className="recipe-card-creation">
                    <div className={`recipe-card-inner-creation ${step === 3 ? 'flip' : '' } ${submitted ? 'spin' : ''}`}>
                        
                        <div className="recipe-card-front-creation">
                            <div className="image-container-creation" >
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    minWidth: "246.4px",
                                    width: "22vw",
                                    minHeight: "246.4px",
                                    height: "22vw",
                                }}
                                />
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