const MongoClient = require("mongodb").MongoClient;
const config = require("../config");

const updateArticles = async () => {
  const client = new MongoClient(config.mongo.url);
  await client.connect();
  console.log("Connected successfully to server");
  client.close();
};

module.exports = { updateArticles };
