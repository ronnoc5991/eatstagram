import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Create from './Create';
import { UserProvider } from './UserContext';
import Intro from './Intro';

function App() {

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Nav/>
          <Intro/>
          <Switch>
            <Route path="/eatstagram/" exact component={ Home } />
            <Route path="/eatstagram/create" exact component={ Create } />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;