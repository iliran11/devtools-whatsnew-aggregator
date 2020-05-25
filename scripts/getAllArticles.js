// Execute on https://developers.google.com/web/updates/tags/devtools-whatsnew

let buttonNodes = document.querySelectorAll('.devsite-article-body a.button');
let allLinks = [];
buttonNodes.forEach(node=>{
  allLinks.push(node.href)
})
console.log(allLinks);
