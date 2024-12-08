const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongo_url = process.env.DB_URL;

let mongoClient = null;

const mongoHelper = {
  getConnectedMongoClient: async function () {
    try {
      if (mongoClient !== null) {
        console.log("Re-Using Mongo Client");
        return mongoClient;
      }
      console.log("Connecting with Mongo Client...");
      mongoClient = await MongoClient.connect(mongo_url);
      return mongoClient;
    } catch (err) {
      console.log("Unable to Connect With MongoClient : ", err);
    }
  },
};

module.exports = {
  mongoHelper,
};
