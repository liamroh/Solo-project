import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};


const playerStateSlice = createSlice({
  name: 'playerState',
  initialState,
  reducers: {
    
    // codePreviewSave: (state,action) => {
    //   state.code = action.payload
    // },
  }
})


// export const { codePreviewSave, codePreviewInput, codePreviewCooperative } = codePreviewSlice.actions;

// export default codePreviewSlice.reducer;
export default playerStateSlice.reducer;
