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
  const links = mapNodes(nodes, (node) => {
    console.log(node.innerHTML);
    return `${config.baseUrl}/${node.href}`;
  });
  const devToolsArticles = [];
  for (const link of links) {
    const htmlParser = HtmlParser(await scraper(link));
    const articles = mapNodes(htmlParser.getNodes("h2"), (node) => {
      const link = `${link}#${node.id}`;
      return {
        title: node.textContent,
        link: `${link}#${node.id}`,
        slug: snakecase(node.textContent),
      };
    });
    const heading = htmlParser.getNode("h1");
    const articleHeader = parseArticleTitle(heading.innerHTML);
    articles.forEach((article) => {
      devToolsArticles.push({
        articleHeader,
        page: link,
        ...article,
      });
    });
    console.log("finished", devToolsArticles.length);
  }
  database.updateDevToolsArticles(devToolsArticles);
};

module.exports = aggregator;
