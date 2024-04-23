

var Truyen = require('../models/truyen')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const getHtmlThoughCloudflare = async (url) => {
    try {
      const html = await cloudscraper.get(url);
      return html;
    } catch (error) {
      //console.log(error);
    }
  }
  
const getContent = async (url) => {
      try {
        const html = await getHtmlThoughCloudflare(url);
        const dom = new JSDOM(html);
        var content = dom.window.document.querySelector('.chapter-c').textContent;
      } catch (error) {
        //console.log(error);
      }
      return content
  }
async function  c1(tentruyen,chapter){
    url='https://truyenfull.vn/'+tentruyen+'/chuong-'+chapter+'/';
    content= await getContent(url)
    truyen = new Truyen('TruyenFull',content);
    return truyen;
}
function c2(){
  return 'TruyenFull'
}

module.exports = {c1,c2};
