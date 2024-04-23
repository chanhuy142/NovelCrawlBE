var Truyen = require('../models/truyen')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const getHtmlThoughCloudflare = async (url) => {
    
      const html = await cloudscraper.get(url);
     
    return html;
  }
  
const getContent = async (url) => {
      
        try {
          const html = await getHtmlThoughCloudflare(url);
          //console.log(html);
          const dom = new JSDOM(html);
          var gContent = dom.window.document.querySelector('.box-chap');
          //console.log('not nulllllllll');
          if (gContent == null) {
            
          //console.log('nullllllllllllllllllllllllllllllll');
          //console.log(html);
            const dom2 = new JSDOM(html);
            var gContent = dom2.window.document.querySelector('.content'); //.content
            content = gContent.textContent;
            return content
          }
          content = gContent.textContent;
          return content
        }
        catch (error) {
          
        }
      
      
  }
async function  c1(tentruyen,chapter){
    //construct url
    url='https://truyen.tangthuvien.vn/doc-truyen/'+tentruyen+'/chuong-'+chapter+'/';
    
    content= await getContent(url)
    //remove all unnecessary space
    if (content) {
      //remove all unnecessary space
      content = content.replace(/\s+/g,' ');
    } else {
      console.error('getContent returned undefined');
    }
    truyen = new Truyen('Tang Thu Vien',content);
    return truyen;
}

function c2(){
  return 'Tang Thu Vien'
}

module.exports = {c1,c2};
