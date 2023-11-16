const mongoose = require('mongoose');
const AudioData = require('../model/songModel.js');
const { gfs } = require('../model/songdb.js');

const audioController = {
  uploadMp3: async (req, res, next) => {
    try {
      const { filename } = req.body;
      // If the mp3 has not been uploaded before, save to gridfs
      const existingAudio = await AudioData.findOne({ filename: filename });
      if (!existingAudio) {
        const writeStream = gfs.createWriteStream({
          filename: filename,
        });
  
        // Pipe the file data from the request into the write stream
        req.file.stream.pipe(writeStream);
  
        writeStream.on('close', (file) => {
          console.log(`File ${file.filename} has been uploaded to GridFS.`);
          // Save the metadata in MongoDB
  
          AudioData.create({
              filename: file.filename,
              fileId: file._id, // Use the file's _id from GridFS
            }, (err, newData) => {
              if (err) {
                return next({
                  log: `Error in audioController.uploadMp3: ${err}`,
                  message: {
                    err: 'Error in audioController.uploadMp3, check server logs for details'
                  }
                });
              }
              else {
                res.locals.newAudio = newData;
                console.log(newData);
                return next();
              }
            });
        });
      }
    }
    catch (err) {
      return next({
        log: `Error in audioController.uploadMp3: ${err}`,
        message: {
          err: 'Error in audioController.uploadMp3, check server logs for details'
        }
      });
    }
  }, 

  fetchMp3: (req, res, next) => {
    const { trackId } = req.params;

    // Find the file in GridFS based on the unique identifier
    const readstream = gfs.createReadStream({ _id: trackId });

    // Set the appropriate headers for the media stream
    res.set('Content-Type', 'audio/mpeg');

    // Pipe the audio data to the response object
    readstream.pipe(res);

    // Error handling
    readstream.on('error', (err) => {
      return next({
        log: `Error in audioController.fetchMp3: ${err}`,
        message: {
          err: 'Error in audioController.fetchMp3, check server logs for details'
        }
      })
    });
  },
};

module.exports = audioController;