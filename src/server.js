const express = require('express'); 
const mongoose = require('mongoose');
const { connectDb, gfs, storage, upload } = require('./model/songdb.js');
const { getToken, fetchWebApi, getRecommendations, findArtist, findTrack, main } = require('./helpers/SpotifyAPIHelpers.js');
require('dotenv').config();

// Initilize Express 
const app = express();
const PORT = 3000; 
const cookieParser = require('cookie-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

// Require controllers
const audioController = require('./controllers/uploadController.js');

/* Spotify Credentials */
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let token;
let refreshToken;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.static('public'));

// Login to authorize Spotify token
app.get('/login', async (req, res) => {
  const params = new URLSearchParams();
  params.append('client_id', client_id);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:3000/callback');
  params.append('scope', 'user-read-currently-playing');

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return res.redirect(url);
});

// Callback for the login endpoint redirect
app.get('/callback', async (req, res) => {
  const { code } = req.query; 
  if (code) {
    const data = await getToken(code, client_id, client_secret);
    token = data.access_token;
    refreshToken = data.refresh_token;
    if (refreshToken) {
      console.log('Token obtained and permission granted');
      res.redirect(302, 'http://localhost:3000');
    }
  } else {
    res.status(400).send('Authorization code not found');
  }
});

app.get('/refresh_token', async(req, res) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
  });
  const parsed = await response.json();
  token = parsed.access_token;
  res.send('Token refreshed')
});

app.get('/fetchmp3/:fileId', (req, res) => {
  const fileId = req.params.fileId; 
  const readStream = gfs.createReadStream({ _id: fileId });

  res.setHeader('Content-Type', 'audio/mpeg');

  readStream.pipe(res); 
  return res.send('success');
});

app.post('/uploadmp3', audioController.uploadMp3, (req, res) => { 
  return res.send('success');
});

// test GET route
app.get('/', (req, res) => { 
  res.send('Get route'); 
}); 

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  // console.log(err);
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 
