let articles = [];
document.querySelectorAll('h2').forEach(node=>{
  articles.push({
    url: `${location.pathname}/${node.id}`,
    text: node.innerText
  })
});
console.log(articles)
