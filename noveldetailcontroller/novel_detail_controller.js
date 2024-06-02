const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const NovelDetail = require('../models/novel_detail')
var cloudscraper = require('cloudscraper');


const getHtmlThoughCloudflare = async (url) => {
  try {
    const html = await cloudscraper.get(url);
    return html;
  } catch (error) {
    //console.log(error);
  }

}


const getDetail2 = async (url) => {
  try {
    //console.log(url)
    titles = []
    imageurls = []
    authors = []
    chaps = []
    urls = []
    descriptions = []
    const html = await getHtmlThoughCloudflare(url);
    const dom = new JSDOM(html);
    console.log(html);
    res = []

    var imageurl = dom.window.document.querySelectorAll('.lazy');
    //console.log(imageurl[0].src)
    var title = dom.window.document.querySelectorAll('h4>a');
    //console.log(title[0].textContent);
    var author = dom.window.document.querySelectorAll('.name');
    //console.log(author[0].textContent);
    var chap = dom.window.document.querySelectorAll('.KIBoOgno');
    //console.log(chap[0].textContent);
    //var newurl= title[0].getAttribute('href');
    //console.log(newurl)

    for (let i = 0; i < title.length; i++) {
      try {
        //console.log(title[i].textContent)
        titles.push(title[i].textContent);
        imageurls.push(imageurl[i].src);

        authors.push(author[i].textContent);
        //extract number and add to chaps ex: chuong 1 -> 1
        chaps.push(chap[i].textContent.match(/\d+/)[0]);

        const newurl = title[i].getAttribute('href')
        urls.push(title[i].getAttribute('href'));
        html2 = await getHtmlThoughCloudflare(newurl)
        const dom2 = new JSDOM(html2);
        var description = dom2.window.document.querySelector('.book-intro');



        //console.log(description.textContent);
        descriptions.push(description.textContent);

        novel_detail = new NovelDetail(
          titles[i],
          imageurls[i],
          urls[i],
          authors[i],
          chaps[i],
          descriptions[i]
        )

        res.push(novel_detail)
      }
      catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);

  }
  return res
}

const getDetail = async (url) => {
  try {
    titles = []
    imageurls = []
    authors = []
    chaps = []
    urls = []
    descriptions = []
    const html = await getHtmlThoughCloudflare(url);
    const dom = new JSDOM(html);
    res = []

    var imageurl = dom.window.document.querySelectorAll('.col-xs-3>div>div');
    //console.log(imageurl[0].getAttribute('data-image'))

    var title = dom.window.document.querySelectorAll('.truyen-title a');
    //console.log(tittle.length);
    var author = dom.window.document.querySelectorAll('.author');

    var chap = dom.window.document.querySelectorAll('.col-xs-2>div>a');
    // console.log(chap[0].textContent);
    //console.log(imageurl.length);
    //for each, get textContent
    for (let i = 0; i < title.length; i++) {
      titles.push(title[i].textContent);
      imageurls.push(imageurl[i].getAttribute('data-image'));
      authors.push(author[i].textContent);
      //extract number and add to chaps ex: chuong 1 -> 1
      chaps.push(chap[i].textContent.match(/\d+/)[0]);

      const newurl = title[i].getAttribute('href')
      urls.push(title[i].getAttribute('href'));
      html2 = await getHtmlThoughCloudflare(newurl)
      const dom2 = new JSDOM(html2);
      var description = dom2.window.document.querySelector('.desc-text');
      //descriptions.push(description.textContent);
      var text = '';
      if (description !== null) {
        description.childNodes.forEach(node => {
          if (node.nodeType === 3 || node.nodeName.toLowerCase() === 'i') { // Node.TEXT_NODE
            text += node.textContent + '\n';
          } else if (node.nodeType === 1 && (node.nodeName.toLowerCase() === 'strong' || node.nodeName.toLowerCase() === 'b')) { // Node.ELEMENT_NODE
            text += node.textContent + ' ';
          }
        });
      }

      descriptions.push(text);
      novel_detail = new NovelDetail(
        titles[i],
        imageurls[i],
        urls[i],
        authors[i],
        chaps[i],
        descriptions[i]
      )



      //console.log(description.textContent);

      res.push(novel_detail)
    }



  } catch (error) {
    console.log(error);

  }
  return res
}






module.exports = { getDetail, getDetail2 };