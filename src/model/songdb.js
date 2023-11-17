const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
require('dotenv').config();

const gfs = { grid: undefined }; // Initialize gfs for storage of mp3s
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
  gfs.grid = Grid(mongoose.connection.db, mongoose.mongo);
});

const audioDataSchema = new mongoose.Schema({
  filename: String,
  title: String,
});

const AudioData = mongoose.model('Audio', audioDataSchema);

module.exports = {
  gfs,
  storage,
  upload, 
  AudioData
};