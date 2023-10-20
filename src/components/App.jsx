import React, { Component } from 'react';
import SongContainer from './SongContainer.jsx';
import TokenButton from './TokenButton.jsx';
import FileUpload from './FileUpload.jsx';


function App() {
  
    return (
      <div className="App">
        <h1>Spotify BetterAI</h1>
        <p>Better song transitions, with 100% less DJ</p>
        <TokenButton />
        <FileUpload />
        <SongContainer />
      </div>
    );
  }

export default App;