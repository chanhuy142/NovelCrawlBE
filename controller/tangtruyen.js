var Truyen = require('../models/truyen')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const TruyenDetail2 = require('../models/truyen_detailv2')
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

async function c3(keyword){
  try {
    const base_url='https://truyen.tangthuvien.vn/ket-qua-tim-kiem?term='
    const url2=base_url+keyword
    //console.log(url)
    titles=[]
    imageurls=[]
    authors=[]
    chaps=[]
    urls=[]
    descriptions=[]
    const html = await getHtmlThoughCloudflare(url2);
    //console.log(html)
    const dom = new JSDOM(html);
    res=[]
    
    var imageurl = dom.window.document.querySelectorAll('.lazy');
    //console.log(imageurl[0].src)
    var title = dom.window.document.querySelectorAll('h4>a');
    //console.log(title[0].textContent);
    var author = dom.window.document.querySelectorAll('.name');
    //console.log(author[0].textContent);
    var chap= dom.window.document.querySelectorAll('.KIBoOgno');
    //console.log(chap[0].textContent);
    //var newurl= title[0].getAttribute('href');
    //console.log(newurl)

    for (let i = 0; i < title.length; i++) {
        //console.log(title[i].textContent)
      titles.push(title[i].textContent);
      imageurls.push(imageurl[0].src);
    
      authors.push(author[i].textContent);
      //extract number and add to chaps ex: chuong 1 -> 1
      chaps.push(chap[i].textContent.match(/\d+/)[0]);

      const newurl=title[i].getAttribute('href')
      urls.push(title[i].getAttribute('href'));
      html2=await getHtmlThoughCloudflare(newurl)
      const dom2 = new JSDOM(html2);
      var description = dom2.window.document.querySelector('.book-intro');
      

      
      //console.log(description.textContent);
      descriptions.push(description.textContent);
      
      truyen_detail = new TruyenDetail2(
        titles[i],
        imageurls[i],
        urls[i],
        authors[i],
        chaps[i],
        descriptions[i]
      )
      console.log(truyen_detail)

      res.push(truyen_detail)
    }

    

   
    
  } catch (error) {
    console.log(error);

  }
  return res
}

module.exports = {c1,c2,c3};
