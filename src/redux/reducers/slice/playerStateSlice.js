import { createSlice } from '@reduxjs/toolkit';

const playerStateSlice = createSlice({
  name: 'playerState',
  initialState: {
    songIndexOne: 0,
    songIndexTwo: 0,
    currentTimeOne: 0,
    seekTimeOne: 0,
    seekTimeTwo: 0,
    toggleOne: false,
    toggleTwo: false,
    volumeOne: 100,
    volumeTwo: 100,
    rotateOne: 0,
    rotateTwo: 0
  },
  reducers: {
    setSongIndexOne: (state, action) => {
      state.songIndexOne = action.payload;
    },
    setSongIndexTwo: (state, action) => {
      state.songIndexTwo = action.payload;
    },
    setCurrentTimeOne: (state, action) => {
      state.currentTimeOne = action.payload;
    },
    setSeekTimeOne: (state, action) => {
      state.seekTimeOne = action.payload;
    },
    setSeekTimeTwo: (state, action) => {
      state.seekTimeTwo = action.payload;
    },
    setToggleOne: (state, action) => {
      state.toggleOne = !state.toggleOne;
    },
    setToggleTwo: (state, action) => {
      state.toggleTwo = !state.toggleTwo;
    },
    setVolumeOne: (state, action) => {
      state.volumeOne = action.payload;
    },
    setVolumeTwo: (state, action) => {
      state.volumeTwo = action.payload;
    },
    setRotateOne: (state, action) => {
      state.rotateOne = action.payload;
    },
    setRotateTwo: (state, action) => {
      state.rotateTwo = action.payload;
    },
  },
});

export const {
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
} = playerStateSlice.actions;

export default playerStateSlice.reducer;
