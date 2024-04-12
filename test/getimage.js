var Truyen = require('../models/truyen')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const getHtmlThoughCloudflare = async (url) => {
    
      const html = await cloudscraper.get(url);
     
    return html;
  }
  
const getContent = async (url) => {
      
        
          const html = await getHtmlThoughCloudflare(url);
          //console.log(html);
          const dom = new JSDOM(html);
          //get img
         Content = dom.window.document.querySelector('img');
         source=Content.src;
        console.log(source);
        return Content
          
        
      
      
  }


getContent('https://truyen.tangthuvien.vn/doc-truyen/thuy-nhuong-tha-tu-tien-dich!--ai-bao-han-tu-tien!')