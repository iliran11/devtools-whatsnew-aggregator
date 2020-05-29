const scraper = require("./scraper");
const HtmlParser = require("./htmlParser");
const config = require("../config");
const mapNodes = require("../utils/mapNodes");
const parseArticleTitle = require("../utils/parseArticleTitle");
const database = require("../database/database");
const snakecase = require("lodash.snakecase");

const aggregator = async () => {
  const html = await scraper(config.articlesPage);
  const htmlParser = HtmlParser(html);
  const nodes = htmlParser.getNodes(".devsite-article-body a.button");
  const pageLinks = mapNodes(nodes, (node) => {
    console.log(node.innerHTML);
    return `${config.baseUrl}/${node.href}`;
  });
  const devToolsArticles = [];
  for (const pageLink of pageLinks) {
    const htmlParser = HtmlParser(await scraper(pageLink));
    const articles = mapNodes(htmlParser.getNodes("h2"), (node) => {
      const articleLink = `${pageLink}#${node.id}`
      return {
        title: node.textContent,
        pageLink,
        articleLink ,
        slug: snakecase(articleLink),
      };
    });
    const pageH1 = htmlParser.getNode("h1");
    const pageHeader = parseArticleTitle(pageH1.innerHTML);
    articles.forEach((article) => {
      devToolsArticles.push({
        pageHeader,
        ...article,
      });
    });
    console.log("finished", devToolsArticles.length);
  }
  database.updateDevToolsArticles(devToolsArticles);
};

module.exports = aggregator;
