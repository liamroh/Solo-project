/* API + HELPER FUNCTIONS */
async function getToken(code, client_id, client_secret) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/callback',
    }),
  });
  return response.json();
};

const fetchWebApi = async (endpoint, method, body, token) => {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

const getRecommendations = async (track, artist, token) => {
  const getRecommendationsHelper = async () => {
    return (
      await fetchWebApi(
        `v1/recommendations?limit=10&seed_artists=${artist}&seed_tracks=${track}`,
        'GET'
      )
    ).tracks;
  };

  const recommendedTracks = await getRecommendationsHelper();
  return recommendedTracks;
};

const findArtist = async (artist, token) => {
  const findArtistHelper = async () => {
    return await fetchWebApi(
      `v1/search?q=${artist}&type=artist&limit=1`,
      'GET'
    );
  };

  const foundArtist = await findArtistHelper();
  return foundArtist.artists.items[0].id;
};

const findTrack = async (track, token) => {
  const findTrackHelper = async () => {
    return await fetchWebApi(`v1/search?q=${track}&type=track&limit=1`, 'GET');
  };

  const foundTrack = await findTrackHelper();
  return foundTrack.tracks.items[0].id;
};

async function main(likedTracks, likedArtists, client_id, client_secret) {
  const trackSearch = await findTrack(likedTracks.value);
  const artistSearch = await findArtist(likedArtists.value);
  const finalRecommendations = await getRecommendations(
    trackSearch,
    artistSearch
  );
};

module.exports = {
  getToken,
  fetchWebApi,
  getRecommendations,
  findArtist,
  findTrack,
  main
};

// call helper functions to find track + artist names based on IDs
// for (let i = 0; i < finalRecommendations.length; i++) {
//     // assign fetched information to variables
//     const albumUrl = finalRecommendations[i].album.images[1].url;
//     const trackName = finalRecommendations[i].name;
//     const artistName = finalRecommendations[i].artists[0].name;
// }
