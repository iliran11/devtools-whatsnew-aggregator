// https://stackoverflow.com/questions/17779744/regular-expression-to-get-a-string-between-parentheses-in-javascript

const parseArticleTitle = (string) => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(string);
  if (Array.isArray(matches) && matches.length > 1) {
    return matches[1];
  }
  return string;
};

module.exports = parseArticleTitle;
