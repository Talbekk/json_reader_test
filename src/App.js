import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Container/>
          Learn React
      </header>
    </div>
  );
}

export default App;
