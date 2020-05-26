const cheerio = require("cheerio");

const htmlParser = (html) => {
  const $ = cheerio.load(html);
  return {
    getNodes() {
      console;
      return;
    },
    getNodeContent: async () => {
      return;
    },
  };
};

module.exports = htmlParser;
