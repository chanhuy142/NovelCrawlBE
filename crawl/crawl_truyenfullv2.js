const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');

const link = 'https://truyenfull.vn/ngao-the-dan-than/chuong-1/'




const getHtmlThoughCloudflare = async (url) => {
  html=await cloudscraper.get(url);
  return html;
}

const getContent = async (url) => {
    const html = await getHtmlThoughCloudflare(url)
    const dom = new JSDOM(html)
    const content = dom.window.document.querySelector('.chapter-c').textContent
    return content
}



module.exports = { getContent }