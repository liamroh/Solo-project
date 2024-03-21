import React from 'react';
import styled from 'styled-components';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const handleTokenClick = async () => {
    try {
      const response = await fetch('/login', {
        method: 'GET',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      if (response) { // Checks if response is not null, we are okay with opaque response
        toast.success('Login successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error('Login failed!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const handleRefreshClick = async () => {
    try {
      const response = await fetch('/refresh_token', {
        method: 'GET',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        toast.success('Token refreshed successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      } else {
        throw new Error('Refresh token failed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error.message);
      toast.error('Token refresh failed!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  return (
    <>
      <Button id="token" onClick={handleTokenClick}>Login with Spotify</Button>
      <Button id="refresh" onClick={handleRefreshClick}>Refresh access token</Button>
    </>
  );
}

export default TokenButton;
