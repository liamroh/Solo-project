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
  // try {
  //   await client.connect();
  //   await client.db("admin").command({ ping: 1 });
  //   console.log("Pinged your deployment. You successfully connected to MongoDB!");

  //   // Initialize GridFS using the client's db connection
  //   gfs = grid(client.db, mongoose.mongo);
  // } finally {
  //   await client.close();
  // }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database");
    gfs = grid(mongoose.connection.db, mongoose.mongo);
  } catch (error) {
    console.log(error);
    process.exit(1);
  } 
}

module.exports = {
  connectDb,
  getGfs: () => gfs, 
  storage,
  upload
};
