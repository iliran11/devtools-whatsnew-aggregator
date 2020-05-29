const baseUrl = "https://developers.google.com";

module.exports = {
  baseUrl,
  articlesPage: `${baseUrl}/web/updates/tags/devtools-whatsnew`,
  mongo: {
    url: process.env.MONGO_CONNECTION,
    dbName: "aggregator",
    devToolsCollection: "chrome-dev-tools-articles",
  },
};
