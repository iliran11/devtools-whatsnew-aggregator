const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const htmlParser = (html) => {
  const document = new JSDOM(html).window.document;
  return {
    getNodes(query) {
      return document.querySelectorAll(query);
    },
    forEach: async (nodes,callback) => {
      nodes.each(callback);
    },
  };
};

module.exports = htmlParser;
