import React, { Component } from 'react';
import SongContainer from './SongContainer.jsx';
import TokenButton from './TokenButton.jsx';
import FileUpload from './FileUpload.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
    return (
      <div className="App">
        <h1>Spotify BetterAI</h1>
        <p>Better song transitions, with 100% less DJ</p>
        <TokenButton />
        <FileUpload />
        <SongContainer />
        <ToastContainer/>
      </div>
    );
  }

export default App;