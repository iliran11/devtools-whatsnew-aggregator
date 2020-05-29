const scraper = require("./scraper");
const HtmlParser = require("./htmlParser");
const config = require("../config");
const mapNodes = require("../utils/mapNodes");
const parseArticleTitle = require("../utils/parseArticleTitle");
const database = require("../database/database");

const aggregator = async () => {
  const html = await scraper(config.articlesPage);
  const htmlParser = HtmlParser(html);
  const nodes = htmlParser.getNodes(".devsite-article-body a.button");
  const links = mapNodes(nodes, (node) => {
    console.log(node.innerHTML);
    return `${config.baseUrl}/${node.href}`;
  });
  const devToolsArticles = [];
  for (const link of links) {
    const htmlParser = HtmlParser(await scraper(link));
    const articlesRow = mapNodes(htmlParser.getNodes("h2"), (node) => {
      return {
        title: node.innerHTML,
        link: `${link}#${node.id}`,
      };
    });
    const heading = htmlParser.getNode("h1");
    devToolsArticles.push({
      header: parseArticleTitle(heading.innerHTML),
      articlesLinks: articlesRow,
      page: link,
    });
    console.log("finished", devToolsArticles.length);
  }
  database.updateDevToolsArticles(devToolsArticles);
};

module.exports = aggregator;
