import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Redirect from="/" to="/home" />
        <Route path='/home' render={(props) => <Home {...props} />} />
      </div>
    );
  }
}
