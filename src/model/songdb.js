const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const multer = require('multer');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let gfs; // Initialize gfs for storage of mp3s
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function connectDb() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Initialize GridFS using the client's db connection
    gfs = grid(client.db, mongoose.mongo);
  } finally {
    await client.close();
  }
}

module.exports = {
  connectDb,
  gfs, 
  storage,
  upload
};
