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

const getTrackAnalysis = async (trackName, token) => {
  const trackId = await findTrack(trackName, token);
  const trackData = await fetchWebApi(`v1/audio-analysis/${trackId}`, 'GET');
  return trackData;
};
const findTransition = (songOne, songTwo) => {
    // Check if we can transition in key (+- 1 key)
    const keyDiff = Math.abs(songOne.track.key - songTwo.track.key);
    if (keyDiff !== 1) {
      return "No good transition";
    }
  
    // Check if the tempos are within 12% of each other to prevent audio artifacts
    const tempoDiffPercentage = Math.abs((songOne.track.tempo - songTwo.track.tempo) / songOne.track.tempo) * 100;
    if (tempoDiffPercentage > 12) {
      return "No good transition";
    }

  // Calculate the average bpm
  const averageBpm = (songOne.track.tempo + songTwo.track.tempo) / 2;

  // Recalculate the timestamp in each section based on the new bpm
  const updatedSectionsOne = songOne.sections.map((section) => {
    const updatedTimestamp = section.start * (60 / averageBpm);
    return {
      ...section,
      start: updatedTimestamp,
    };
  });

  const updatedSectionsTwo = songTwo.sections.map((section) => {
    const updatedTimestamp = section.start * (60 / averageBpm);
    return {
      ...section,
      start: updatedTimestamp,
    };
  });

  // Find the index of the loudest section of song 1 (drop of the song)
  const dropOneIdx = updatedSectionsOne.sections.reduce(
    (maxIndex, section, currentIndex) =>
      section.loudness > updatedSectionsOne.sections[maxIndex].loudness
        ? currentIndex
        : maxIndex,
    0
  );

  // Find the index of the loudest section of song 2 (drop of the song)
  const dropTwoIdx = updatedSectionsTwo.sections.reduce(
    (maxIndex, section, currentIndex) =>
      section.loudness > updatedSectionsTwo.sections[maxIndex].loudness
        ? currentIndex
        : maxIndex,
    0
  );

  // We want the timestamp of the section afterwards of song 1, and the index of the section before song 2
  const transitionOne = Math.max(dropOneIdx + 1, 0).start;
  const transitionTwo = Math.max(dropTwoIdx - 1, 0).start;

  return [transitionOne, transitionTwo];
}
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
  main, 
  getTrackAnalysis, 
  findTransition
};

// call helper functions to find track + artist names based on IDs
// for (let i = 0; i < finalRecommendations.length; i++) {
//     // assign fetched information to variables
//     const albumUrl = finalRecommendations[i].album.images[1].url;
//     const trackName = finalRecommendations[i].name;
//     const artistName = finalRecommendations[i].artists[0].name;
// }
