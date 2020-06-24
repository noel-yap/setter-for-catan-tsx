import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Security, LoginCallback } from '@okta/okta-react';

import config from './config';
import Home from './Home';

import './App.css';

const App = () => { 
  return (
    <div className="App">
      <header className="App-body">
        <Router>
          <Security {...config.oidc}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Home} />
            <Route path={config.authCallbackPath} component={LoginCallback} />
          </Security>
        </Router>
      </header>
    </div>
  );
};

export default App;
