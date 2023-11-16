const mongoose = require('mongoose');

const audioDataSchema = new mongoose.Schema({
  filename: String,
  title: String,
});

const AudioData = mongoose.model('Audio', audioDataSchema);

module.exports = AudioData;