import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container';
import DisplayJson from './DisplayJson';

function App() {

  const [submittedJson, setSubmittedJson] = useState("");

  function addJsonToScreen(json){
    setSubmittedJson(json);
}

function clearClipboard(){
  setSubmittedJson("")
}


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Container addJsonToScreen={addJsonToScreen}/>
        <DisplayJson submittedJson={submittedJson} clearClipboard={clearClipboard}/>
      </header>
    </div>
  );
}

export default App;
