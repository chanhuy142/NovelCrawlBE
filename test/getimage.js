var Novel = require('../models/novel')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const getHtmlThoughCloudflare = async (url) => {

  const html = await cloudscraper.get(url);

  return html;
}

const getImage = async (url) => {


  const html = await getHtmlThoughCloudflare(url);
  //console.log(html);
  const dom = new JSDOM(html);
  //get img
  Content = dom.window.document.querySelector('img');
  source = Content.src;
  //console.log(source);
  return Content




}

getImage('https://truyen.tangthuvien.vn/doc-truyen/trong-sinh-chi-toi-cuong-kiem-than/').then((res) => {
  //console.log(res);
})

