const MongoClient = require("mongodb").MongoClient;
const config = require("../config");

const updateDevToolsArticles = async (articles) => {
  const updateOperations = articles.map((article) => {
    return {
      updateOne: {
        filter: { slug: article.slug },
        update: { $set: article },
        upsert: true,
      },
    };
  });
  const client = new MongoClient(config.mongo.url);
  await client.connect();
  const db = await client.db(config.mongo.dbName);
  const result = await db
    .collection(config.mongo.devToolsCollection)
    .bulkWrite(updateOperations);
  console.log(result);
  client.close();
};

module.exports = { updateDevToolsArticles };
