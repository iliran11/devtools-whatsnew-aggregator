const scraper = require("./scraper");
const HtmlParser = require("./htmlParser");
const config = require("../config");
const mapNodes = require("../utils/mapNodes");

const aggregator = async () => {
  const html = await scraper(config.articlesPage);
  const htmlParser = HtmlParser(html);
  const nodes = htmlParser.getNodes(".devsite-article-body a.button");
  const links = mapNodes(nodes, (node) => `${config.baseUrl}/${node.href}`);
  console.log(links);
};

module.exports = aggregator;
