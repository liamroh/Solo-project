import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  background: white;
  border-radius: 3em;
  border: 0.2em solid #1DB954;
  color: #1DB954;
  margin: 1em;
  padding: 0.25em 1em;
  cursor: pointer;
`

function TokenButton() {
  const handleTokenClick = () => {
    window.location.href = '/login'; 
  };
  const handleRefreshClick = () => {
    window.location.href = '/refresh_token'; 
  };

    return (
      <>
        <Button id="token" onClick={handleTokenClick}>Login with Spotify</Button>
        <Button id="refresh" onClick={handleRefreshClick}>Refresh access token</Button>
      </>
    );
  }

export default TokenButton;