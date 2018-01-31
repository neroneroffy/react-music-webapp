import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router';
import './App.css'
class App extends Component {
componentDidMount(){
    sessionStorage.setItem("userId","5")
}
  render() {
    return (
      <Provider store={store}>
          <div className="App">
            <Router></Router>
          </div>
      </Provider>
    );
  }
}

export default App;
