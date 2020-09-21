import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Create from './Create';

function App() {

  return (
    <Router>
      <div className="App">

        <Nav/>
    
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/create" exact component={ Create } />
        </Switch>

      </div>
    </Router>
  );
}

export default App;