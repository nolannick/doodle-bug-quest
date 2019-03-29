import React, { Component } from 'react';
import './App.css';
import Header from "./components/header"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/login';
import Family from './components/family';
import Quest from './components/quest';
import Reward from './components/reward';
import ErrorPage from './components/errorPage';
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Header />
          <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/family" component={Family} />
          <ProtectedRoute exact path="/quest" component={Quest} />
          <ProtectedRoute exact path="/reward" component={Reward} />
          <Route component={ ErrorPage}/>
          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
