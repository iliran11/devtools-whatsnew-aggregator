const scraper = require("./scraper");
const HtmlParser = require("./htmlParser");
const config = require("../config");
const mapNodes = require("../utils/mapNodes");
const parseArticleTitle = require("../utils/parseArticleTitle");

const aggregator = async () => {
  const html = await scraper(config.articlesPage);
  const htmlParser = HtmlParser(html);
  const nodes = htmlParser.getNodes(".devsite-article-body a.button");
  const links = mapNodes(nodes, (node) => {
    console.log(node.innerHTML);
    return `${config.baseUrl}/${node.href}`;
  });
  const data = [];
  for (const link of links) {
    const htmlParser = HtmlParser(await scraper(link));
    const articlesRow = mapNodes(htmlParser.getNodes("h2"), (node) => {
      return {
        title: node.innerHTML,
        link: `${link}#${node.id}`,
      };
    });
    const heading = htmlParser.getNode("h1");
    data.push({
      header: parseArticleTitle(heading.innerHTML),
      articlesLinks: articlesRow,
      page: link,
    });
    console.log("finished", data.length);
  }
  console.log(data);
};

module.exports = aggregator;
