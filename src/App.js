import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Create from './Create';
import foodImage from './food-3-min.jpg';

function App() {

  var intro = useRef(null);
  var imageContainer = useRef(null);
  var image = useRef(null);
  var introTitle = useRef(null);

  function beginIntroAnimation () {
    const tl = gsap.timeline(); //eslint-disable-line
    tl.to(image, {opacity: 1, duration: .4});
    tl.fromTo(introTitle, {opacity: 0}, {opacity: 1, duration: 1, delay: .5});
    tl.to(intro, {opacity: 0, duration: 1, delay: 1});
    tl.to(imageContainer, {opacity: 0, duration: 1, delay: '-1'});
    tl.to(intro, {y: "-100%", duration: .1});
    tl.to(imageContainer, {y: "-100%", duration: .1, delay: '-.1'});
  }

  return (
      <Router>
        <div className="App">

           <div className="intro" ref={ (el) => { intro = el } }></div>
            <div className="screen" ref={ (el) => { imageContainer = el } }>
              <img src={ foodImage } alt="" onLoad={ beginIntroAnimation } ref={ (el) => { image = el } } />
              <div className="intro-title" ref={ (el) => { introTitle = el } }>
                <h1>Eatstagram</h1>
              </div>
            </div>

          <Nav/>
          <Switch>
            <Route path="/eatstagram/" exact component={ Home } />
            <Route path="/eatstagram/create" exact component={ Create } />
          </Switch>
        </div>
      </Router>
  );
}

export default App;