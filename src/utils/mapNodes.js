const config = require("../config");

const mapNodes = (nodes, callback) => {
  const newArray = [];
  nodes.forEach((node) => {
    newArray.push(callback(node));
  });
  return newArray;
};

module.exports = mapNodes;
