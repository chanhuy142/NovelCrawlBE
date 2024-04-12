const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
url='https://truyen.tangthuvien.vn/tong-hop?rank=td&page=2'
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
        //get ALL h4 tag

        var content = dom.window.document.querySelectorAll('h4')
        //remove Tình trạng,Thể loại,Xếp hạng,Thời gian,Số chương,Sắp xếp theo,Tags
        content = Array.from(content).slice(7)
      } catch (error) {
        //console.log(error);

      }
      return content
  }

  const getContent5pages = async (url) => {
    urls=[]
    for (let i = 1; i < 10; i++) {
      urls.push(url+'?rank=td&page='+i)
    }
    contents=[]
    for (let i = 0; i < urls.length; i++) {
      content= await getContent(urls[i])
      content.forEach(function(element){
        contents.push(element.textContent)
      })
    }

    return contents
  }
 
  getContent5pages(url).then(function(result){
    console.log(result)
  })