const mongoose = require('mongoose');

const audioDataSchema = new mongoose.Schema({
  filename: String,
  title: String,
});

export const AudioData = mongoose.model('Audio', audioDataSchema);