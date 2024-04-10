

var Truyen = require('../models/truyen')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
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
async function  c1(tentruyen,chapter){
    url='https://truyenfull.vn/'+tentruyen+'/chuong-'+chapter+'/';
    content= await getContent(url)
    truyen = new Truyen('truyenfull',content);
    return truyen;
}
module.exports = {c1};