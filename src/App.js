import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Create from './Create';

function App() {

  var introBackground = useRef(null);
  var introImage = useRef(null);
  var introTitle = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline(); //eslint-disable-line
    tl.fromTo(introImage, {opacity: 0}, {opacity: 1, duration: 2});
    tl.fromTo(introTitle, {opacity: 0}, {opacity: 1, duration: 1});
    tl.fromTo(introBackground, {y: 0}, {y: "-100%", duration: 1});
    tl.fromTo(introImage, {opacity: 1}, {opacity: 0, duration: 1});
    tl.fromTo(introImage, {y: 0}, {y: '-100%', duration: .1});
  }, [])

  return (
      <Router>
        <div className="App">

           <div className="intro" ref={ (el) => { introBackground = el } }></div>
            <div className="screen" ref={ (el) => { introImage = el } }>
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