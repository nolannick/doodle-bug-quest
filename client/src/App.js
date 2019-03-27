import React, { Component } from 'react';
import './App.css';
import Header from "./components/header"
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/login';
import Family from './components/family';
import Quest from './components/quest';
import Reward from './components/reward';
import AddReward from './components/addReward';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Header />
          <Route exact path="/" component={Login} />
          <Route exact path="/family" component={Family} />
          <Route exact path="/quest" component={Quest} />
          <Route exact path="/reward" component={Reward} />
          <Route exact path="/reward/add" component={AddReward} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
