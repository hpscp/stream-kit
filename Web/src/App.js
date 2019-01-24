import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from './Components/Main/Main';
import Overlay from './Components/Overlay/Overlay';
import NotFound from './Components/NotFound/NotFound';

import s from './app.module.css';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route  exact path="/overlay" component={Overlay}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
