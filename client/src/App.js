import React, { Component } from 'react';
import './App.css';
import Header from "./components/header"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/login';
import Family from './components/family';
import Quest from './components/quest';
import Reward from './components/reward';
import ErrorPage from './components/errorPage';
import ProtectedRoute from './components/ProtectedRoute';
import NewPassword from './components/newPassword';
import randomGif from './components/gifDisplay';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div >
          <Header />
          <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/newpassword" component={NewPassword} />          
          <ProtectedRoute exact path="/family" component={Family} />
          <ProtectedRoute exact path="/quest" component={Quest} />
          <ProtectedRoute exact path="/reward" component={Reward} />
          <ProtectedRoute exact path="/rewardGif" component={randomGif} />
          <Route component={ErrorPage}/>
          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;


var http = require("http");
setInterval(function() {
    http.get("http://doodle-bug-quest.herokuapp.com/");
}, 300000); // every 5 minutes (300000)