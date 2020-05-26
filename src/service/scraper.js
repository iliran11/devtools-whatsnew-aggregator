const got = require("got");

const scraper = async (url) => {
  const response = await got(url);
  return response.body

}

module.exports = scraper;
