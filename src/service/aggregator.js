const scraper = require("./scraper");
const HtmlParser = require("./htmlParser");
const config = require("../config");

const aggregator = async () => {
  const html = await scraper(config.baseUrl);
  const htmlParser = HtmlParser(html);
  const nodes = htmlParser.getNodes(html, ".devsite-article-body a.button");
};

module.exports = aggregator;
