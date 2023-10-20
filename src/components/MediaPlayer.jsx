import React, { Component, useState, useEffect, useRef, forwardRef } from 'react';

// const MediaPlayer = forwardRef((props, ref) => {
//     const [id, setId] = useState(props.data.id);

//     useEffect(() => {
//       setId(props.data.id);
//     }, [props.data.id]);
  
//     return (
//       <audio key={id} id={id} controls>
//         <source src={id} type='audio/mp3' />
//       </audio>
//     );
//   }

const MediaPlayer = forwardRef((props, ref) => {
    const { id } = props.data;
    const { seekTime } = props.data;

    useEffect(() => {
        const audioElement = ref.current;
        audioElement.src = id;
        audioElement.load();
        audioElement.currentTime = seekTime;
    }, [id, ref]);

    return (
        <audio ref={ref} controls>
            <source src={id} type="audio/mp3" />
        </audio>
    );
});

export default MediaPlayer;

/**
 * 
 * 114.420834 for first time
 * $0.currentTime = 114.410834
 * $0.currentTime = 114.411834
 * 

 */