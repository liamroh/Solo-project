import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import playerStateSlice, {
  setSongIndexOne,
  setSongIndexTwo,
  setVolumeOne,
  setVolumeTwo,
  setToggleOne,
  setToggleTwo,
  setRotateOne,
  setRotateTwo,
} from '../redux/reducers/slice/playerStateSlice.js'; 
import MediaPlayer from './MediaPlayer.jsx';

function SongContainer() {
  const dispatch = useDispatch();
  const songIndexOne = useSelector((state) => state.playerStateSlice.songIndexOne);
  const songIndexTwo = useSelector((state) => state.playerStateSlice.songIndexTwo);
  const volumeOne = useSelector((state) => state.playerStateSlice.volumeOne);
  const volumeTwo = useSelector((state) => state.playerStateSlice.volumeTwo);
  const rotateOne = useSelector((state) => state.playerStateSlice.rotateOne);
  const rotateTwo = useSelector((state) => state.playerStateSlice.rotateTwo);
  const toggleOne = useSelector((state) => state.playerStateSlice.toggleOne);
  const toggleTwo = useSelector((state) => state.playerStateSlice.toggleTwo);

  const [audioContext, setAudioContext] = useState(null);
  const [audioSourceOne, setAudioSourceOne] = useState(null);
  const [audioSourceTwo, setAudioSourceTwo] = useState(null);
  const [playbackState, setPlaybackState] = useState('stopped');
  const [rotateIntervalOne, setRotateIntervalOne] = useState(0);
  const [rotateIntervalTwo, setRotateIntervalTwo] = useState(0);


  const timer = useRef();

  const firstGainNode = audioContext ? audioContext.createGain() : null;
  const secondGainNode = audioContext ? audioContext.createGain() : null;

  const songs = [
    { title: 'Mula by Eliminate', url: './music/Mula.flac' },
    { title: 'Chicken Rollercoaster x Bad And Boujee', url: './music/Chicken Rollercoaster.mp3' },
  ];

  const initializeAudioContext = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
  };

  useEffect(() => {
    if (!audioContext) {
      initializeAudioContext();
    }
  }, [audioContext]);

  const playAudio = (source, index) => {
    if (audioContext) {
      fetch(songs[index].url)
        .then((response) => response.arrayBuffer())
        .then((audioData) => audioContext.decodeAudioData(audioData))
        .then((audioBuffer) => {
          const audioSource = audioContext.createBufferSource();
          audioSource.buffer = audioBuffer;
          audioSource.connect(index === 0 ? firstGainNode : secondGainNode);
          (index === 0 ? firstGainNode : secondGainNode).connect(audioContext.destination);
          audioSource.start();
          setPlaybackState('playing');
          if (index === 0) {
            setAudioSourceOne(audioSource);
          } else {
            setAudioSourceTwo(audioSource);
          }
        })
        .catch((error) => {
          console.error('Error decoding audio data:', error);
        });
    }
  };

  const togglePlaybackOne = () => {
    dispatch(setToggleOne());
    if (audioContext) {
      if (playbackState === 'playing' && audioSourceOne) {
        audioSourceOne.stop();
        setPlaybackState('stopped');
        clearInterval(rotateIntervalOne);
      } else {
        playAudio(audioSourceOne, songIndexOne);
        startRotation(true);
      }
    }
  };

  const togglePlaybackTwo = () => {
    dispatch(setToggleTwo());
    if (audioContext) {
      if (playbackState === 'playing' && audioSourceTwo) {
        audioSourceTwo.stop();
        setPlaybackState('stopped');
        clearInterval(rotateIntervalTwo);
      } else {
        playAudio(audioSourceTwo, songIndexTwo);
        startRotation(false);
      }
    }
  };

  const handleChangeOne = (event) => {
    const selectedIndex = event.target.selectedIndex;
    dispatch(setSongIndexOne(selectedIndex));
  };
  
  const handleChangeTwo = (event) => {
    const selectedIndex = event.target.selectedIndex;
    dispatch(setSongIndexTwo(selectedIndex));
  };

  
  const handleVolumeChangeOne = (event) => {
    const newVolume = parseFloat(event.target.value) / 100;
    dispatch(setVolumeOne(newVolume));
    firstGainNode.gain.value = newVolume;
  };
  
  const handleVolumeChangeTwo = (event) => {
    const newVolume = parseFloat(event.target.value) / 100;
    dispatch(setVolumeTwo(newVolume));
    secondGainNode.gain.value = newVolume;
  };

  // useEffect(() => {
  //   const intervalOne = setInterval(() => {
  //     if (toggleOne && audioSourceOne && audioContext.state === 'running') {
  //       setRotateOne((prevAngle) => prevAngle + 6);
  //     }
  //   }, 100);
  //   const intervalTwo = setInterval(() => {
  //     if (toggleTwo && audioSourceTwo && audioContext.state === 'running') {
  //       setRotateTwo((prevAngle) => prevAngle + 6);
  //     }
  //   }, 100);

  //   if (audioSourceOne) {
  //     audioContext.addEventListener("timeupdate", handleTransition);
  //   }
  //   return () => {
  //     clearTimeout(timer.current);
  //     clearInterval(intervalOne);
  //     clearInterval(intervalTwo);
  //   };
  // }, [toggleOne, toggleTwo]);

  const startRotation = (isFirst) => {
    if (isFirst) {
      setRotateIntervalOne(setInterval(() => {
        dispatch(setRotateOne(6));
      }, 100));
    }
    else {
      setRotateIntervalTwo(setRotateIntervalTwo(setInterval(() => {
        dispatch(setRotateOne(6));
      }, 100)));
    }
  };

  const handleTransition = (event) => {
    // const currentTime = event.target.currentTime;
    // setCurrentTimeOne(currentTime);
    // if (!timer.current) {
    //   timer.current = setTimeout(() => {
    //     setCurrentTimeOne(currentTime);
    //     lastTimeRef.current = currentTime;
    //     timer.current = null;
    //   }, 1);
    // }

    // if (event.target.currentTime >= 130.967589) {
    //   if (firstRef.current.volume - 0.0065 > 0) {
    //     firstRef.current.volume -= 0.0065;
    //     setVolumeOne(firstRef.current.volume * 100);
    //     if (secondRef.current.volume + 0.0065 < 1) {
    //       secondRef.current.volume += 0.0065;
    //       setVolumeTwo(secondRef.current.volume * 100);
    //     }
    //   } else if (firstRef.current.volume - 0.0065 < 0) {
    //     firstRef.current.pause();
    //     setToggleOne(false);
    //   }
    //   secondRef.current.play();
    //   setToggleTwo(true);
    // }
  };

  return (
    <div className="songContainer">
      <div className="turnTable">
        <div className="slidecontainer">
          <img
            style={{ transform: `rotate(${rotateOne}deg)` }}
            src="https://static.vecteezy.com/system/resources/previews/009/313/617/original/vinyl-record-vector-illustration-isolated-on-white-background-free-png.png"
            alt="Vinyl Record One"
          />
          <input
            type="range"
            onChange={handleVolumeChangeOne}
            min="1"
            max="100"
            value={volumeOne * 100}
            className="slider"
          />
          <div className="songContainerOne">
            <select onChange={handleChangeOne} name="songs" id="songs">
              {songs.map((song, index) => (
                <option key={index} value={song.title}>
                  {song.title}
                </option>
              ))}
            </select>
          </div>
          <button onClick={togglePlaybackOne}>
            {toggleOne ? "Pause" : "Play"}
          </button>
        </div>
        <div className="slidecontainer">
          <img
            style={{ transform: `rotate(${rotateTwo}deg)` }}
            src="https://static.vecteezy.com/system/resources/previews/009/313/617/original/vinyl-record-vector-illustration-isolated-on-white-background-free-png.png"
            alt="Vinyl Record Two"
          />
          <input
            type="range"
            onChange={handleVolumeChangeTwo}
            min="1"
            max="100"
            value={volumeTwo * 100}
            className="slider"
          />
          <div className="songContainerTwo">
            <select onChange={handleChangeTwo} name="songs" id="songs">
              {songs.map((song, index) => (
                <option key={index} value={song.title}>
                  {song.title}
                </option>
              ))}
            </select>
          </div>
          <button onClick={togglePlaybackTwo}>
            {toggleTwo ? "Pause" : "Play"}
          </button>
        </div> 
      </div>
    </div>
  );
}

export default SongContainer;
