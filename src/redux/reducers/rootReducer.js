import { combineReducers } from '@reduxjs/toolkit';

// Need to import each slice which will be combined in the rootReducer
import playerStateSlice from './slice/playerStateSlice.js';

const rootReducer = combineReducers({
  // Add desired slices here
  playerStateSlice: playerStateSlice,
});

export default rootReducer;
