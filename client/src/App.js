import React, { Component } from 'react';
import Aux from './Components/HOCs/Aux';
import Layout from './Layout/Layout'
import './App.css';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout />
      </Aux>
    );
  }
}

export default App;
