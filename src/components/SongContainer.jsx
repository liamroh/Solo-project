// import React, { useRef, useState, useEffect, forwardRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import MediaPlayer from "./MediaPlayer.jsx";

// function SongContainer() {
//   const dispatch = useDispatch();
  
//   const [songIndexOne, setSongIndexOne] = useState(0);
//   const [songIndexTwo, setSongIndexTwo] = useState(0);
//   const [currentTimeOne, setCurrentTimeOne] = useState(0);
//   const [seekTimeOne, setSeekTimeOne] = useState(0);
//   const [seekTimeTwo, setSeekTimeTwo] = useState(0);
//   const [toggleOne, setToggleOne] = useState(false);
//   const [toggleTwo, setToggleTwo] = useState(false);
//   const [volumeOne, setVolumeOne] = useState(100);
//   const [volumeTwo, setVolumeTwo] = useState(100);
//   const [rotateOne, setRotateOne] = useState(0);
//   const [rotateTwo, setRotateTwo] = useState(0);

//   const songs = [
//     <option value="song1">Mula by Eliminate</option>,
//     <option value="song2">
//       Chicken Rollercoaster x Bad And Boujee (Nitti Gritti Edit)
//     </option>,
//   ];

//   const urls = ["./music/Mula.flac", "./music/Chicken Rollercoaster.mp3"];

//   const firstRef = useRef();
//   const secondRef = useRef();
//   const timer = useRef();
//   const lastTimeRef = useRef();
//   const faderRefOne = useRef();
//   const faderRefTwo = useRef();

//   const handleChangeOne = (event) => {
//     const selectedValue = event.target.value;
//     if (selectedValue === "song1") {
//       setSongIndexOne(0);
//       setToggleOne(true);
//     } else if (selectedValue === "song2") {
//       setSongIndexOne(1);
//       setToggleOne(true);
//     } else {
//       setToggleOne(false);
//     }
//   };

//   const handleChangeTwo = (event) => {
//     const selectedValue = event.target.value;
//     if (selectedValue === "song1") {
//       setSongIndexTwo(0);
//       setToggleTwo(true);
//     } else if (selectedValue === "song2") {
//       setSongIndexTwo(1);
//       setToggleTwo(true);
//       setSeekTimeTwo(38.41);
//     } else {
//       setToggleTwo(true);
//     }
//   };

//   const handleVolumeChangeOne = (event) => {
//     setVolumeOne(event.target.value);
//     firstRef.current.volume = volumeOne / 100;
//   };

//   const handleVolumeChangeTwo = (event) => {
//     setVolumeTwo(event.target.value);
//     secondRef.current.volume = volumeTwo / 100;
//   };

//   useEffect(() => {
//     const intervalOne = setInterval(() => {
//       if (toggleOne && firstRef.current && !firstRef.current.paused) {
//         setRotateOne((prevAngle) => prevAngle + 6);
//       }
//     }, 100);
//     const intervalTwo = setInterval(() => {
//       if (toggleTwo && secondRef.current && !secondRef.current.paused) {
//         setRotateTwo((prevAngle) => prevAngle + 6);
//       }
//     }, 100);

//     if (firstRef.current) {
//       firstRef.current.addEventListener("timeupdate", handleTransition);
//     }
//     return () => {
//       clearTimeout(timer.current);
//       clearInterval(intervalOne);
//       clearInterval(intervalTwo);
//     };
//   }, [toggleOne, toggleTwo]);

//   const handleTransition = (event) => {
//     const currentTime = event.target.currentTime;
//     setCurrentTimeOne(currentTime);
//     if (!timer.current) {
//       timer.current = setTimeout(() => {
//         setCurrentTimeOne(currentTime);
//         lastTimeRef.current = currentTime;
//         timer.current = null;
//       }, 1);
//     }

//     if (event.target.currentTime >= 130.967589) {
//       if (firstRef.current.volume - 0.0065 > 0) {
//         firstRef.current.volume -= 0.0065;
//         setVolumeOne(firstRef.current.volume * 100);
//         if (secondRef.current.volume + 0.0065 < 1) {
//           secondRef.current.volume += 0.0065;
//           setVolumeTwo(secondRef.current.volume * 100);
//         }
//       } else if (firstRef.current.volume - 0.0065 < 0) {
//         firstRef.current.pause();
//         setToggleOne(false);
//       }
//       secondRef.current.play();
//       setToggleTwo(true);
//     }
//   };

//   return (
//     <div className="songContainer">
//       <div class="turnTable">
//         <div class="slidecontainer">
//           <img
//             style={{ transform: `rotate(${rotateOne}deg)` }}
//             src="https://static.vecteezy.com/system/resources/previews/009/313/617/original/vinyl-record-vector-illustration-isolated-on-white-background-free-png.png"
//           />
//           <input
//             type="range"
//             ref={faderRefOne}
//             onChange={handleVolumeChangeOne}
//             min="1"
//             max="100"
//             value={volumeOne}
//             class="slider"
//             id="faderOne"
//           />
//           <div className="songContainerOne">
//             <select onChange={handleChangeOne} name="songs" id="songs">
//               {songs}
//             </select>
//             <MediaPlayer
//               ref={firstRef}
//               id="trackOne"
//               data={{ id: urls[songIndexOne], seekTime: seekTimeOne }}
//             />
//           </div>
//         </div>
//         <div class="slidecontainer">
//           <img
//             style={{ transform: `rotate(${rotateTwo}deg)` }}
//             src="https://static.vecteezy.com/system/resources/previews/009/313/617/original/vinyl-record-vector-illustration-isolated-on-white-background-free-png.png"
//           />
//           <input
//             type="range"
//             ref={faderRefTwo}
//             onChange={handleVolumeChangeTwo}
//             min="1"
//             max="100"
//             value={volumeTwo}
//             class="slider"
//             id="faderTwo"
//           />
//           <div className="songContainerTwo">
//             <select onChange={handleChangeTwo} name="songs" id="songs">
//               {songs}
//             </select>
//             <MediaPlayer
//               ref={secondRef}
//               id="trackTwo"
//               data={{ id: urls[songIndexTwo], seekTime: seekTimeTwo }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SongContainer;

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import playerStateSlice, {
  setSongIndexOne,
  setSongIndexTwo,
  setCurrentTimeOne,
  setSeekTimeOne,
  setSeekTimeTwo,
  setToggleOne,
  setToggleTwo,
  setVolumeOne,
  setVolumeTwo,
  setRotateOne,
  setRotateTwo,
} from '../redux/reducers/slice/playerStateSlice.js'; // Replace with the actual path to your reducer file
import MediaPlayer from "./MediaPlayer.jsx";

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

  const timer = useRef();

  const audioContext = new (window.AudioContext || window.webkitAudioContext)(); 
  let audioSourceOne = audioContext.createBufferSource();
  let audioSourceTwo = audioContext.createBufferSource();

  audioSourceOne.connect(audioContext.destination);
  audioSourceTwo.connect(audioContext.destination);

  const firstGainNode = audioContext.createGain();
  const secondGainNode = audioContext.createGain();

  const songs = [
    { title: 'Mula by Eliminate', url: './music/Mula.flac' },
    { title: 'Chicken Rollercoaster x Bad And Boujee', url: './music/Chicken Rollercoaster.mp3' },
  ];

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
  
  const togglePlaybackOne = () => {
    dispatch(setToggleOne());
    if (audioSourceOne) {
      if (!toggleOne) {
        audioSourceOne = playAudio(audioSourceOne, songIndexOne);
      } else {
        // Check if the source is currently playing before stopping
        if (audioContext.state === 'running') {
          console.log('trying to stop');
          audioSourceOne.stop();
        }
      }
    }
  };
  
  const togglePlaybackTwo = () => {
    dispatch(setToggleTwo());
    if (audioSourceTwo) {
      if (!toggleTwo) {
        audioSourceTwo = playAudio(audioSourceTwo, songIndexTwo);
      } else {
        // Check if the source is currently playing before stopping
        if (audioContext.state === 'running') {
          console.log('trying to stop');
          audioSourceTwo.stop();
        }
      }
    }
  };
  
  
  const playAudio = (source, index) => {
    fetch(songs[index].url)
      .then((response) => response.arrayBuffer())
      .then((audioData) => audioContext.decodeAudioData(audioData))
      .then((audioBuffer) => {
        source.buffer = audioBuffer;
        source.connect(index === 0 ? firstGainNode : secondGainNode);
        (index === 0 ? firstGainNode : secondGainNode).connect(audioContext.destination);
        source.start();
        return source;
      });
  };

    useEffect(() => {
      const intervalOne = setInterval(() => {
        if (toggleOne && audioSourceOne && audioContext.state === 'running') {
          setRotateOne((prevAngle) => prevAngle + 6);
        }
      }, 100);
      const intervalTwo = setInterval(() => {
        if (toggleTwo && secondRef.current && audioContext.state === 'running') {
          setRotateTwo((prevAngle) => prevAngle + 6);
        }
      }, 100);

      if (audioSourceOne) {
        audioContext.addEventListener("timeupdate", handleTransition);
      }
      return () => {
        clearTimeout(timer.current);
        clearInterval(intervalOne);
        clearInterval(intervalTwo);
      };
    }, [toggleOne, toggleTwo]);

  // const startRotation = (isFirst) => {
  //   setInterval(() => {
  //     if ((isFirst ? toggleOne : toggleTwo) && (isFirst ? audioSourceOne.current : audioSourceTwo.current) && (isFirst ? audioSourceOne.current.playbackState === audioSourceOne.current.PLAYING_STATE : audioSourceTwo.current.playbackState === audioSourceTwo.current.PLAYING_STATE)) {
  //       if (isFirst) {
  //         setRotateOne((prevAngle) => prevAngle + 6);
  //       } else {
  //         setRotateTwo((prevAngle) => prevAngle + 6);
  //       }
  //     }
  //   }, 100);
  // };

  const handleTransition = (event) => {
    const currentTime = event.target.currentTime;
    setCurrentTimeOne(currentTime);
    if (!timer.current) {
      timer.current = setTimeout(() => {
        setCurrentTimeOne(currentTime);
        lastTimeRef.current = currentTime;
        timer.current = null;
      }, 1);
    }

    if (event.target.currentTime >= 130.967589) {
      if (firstRef.current.volume - 0.0065 > 0) {
        firstRef.current.volume -= 0.0065;
        setVolumeOne(firstRef.current.volume * 100);
        if (secondRef.current.volume + 0.0065 < 1) {
          secondRef.current.volume += 0.0065;
          setVolumeTwo(secondRef.current.volume * 100);
        }
      } else if (firstRef.current.volume - 0.0065 < 0) {
        firstRef.current.pause();
        setToggleOne(false);
      }
      secondRef.current.play();
      setToggleTwo(true);
    }
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
