

var Novel = require('../models/novel')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const NovelDetail = require('../models/novel_detail')
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

    //var content = dom.window.document.querySelector('.chapter-c').textContent;
    const chapter = dom.window.document.querySelector('.chapter-c');

    var content = '';
    chapter.childNodes.forEach(node => {
      if (node.nodeType === 3) { // Node.TEXT_NODE
        let text = node.textContent.trim();
        content += text;
        if (text.endsWith(".") || text.endsWith("!") || text.endsWith("?") || text.endsWith(":") || text.endsWith('."')) {
          content += '\n\n';
        }
        else {
          content += ' ';
        }
      }
      else if (node.nodeName.toLowerCase() === 'i') {
        content += node.textContent + ' ';
      }
    });
    if (content === '') {
      let pElement = chapter.querySelector('p');
      if (pElement !== null) {
        pElement.childNodes.forEach(node => {
          if (node.nodeType === 3) { // Node.TEXT_NODE
            let text = node.textContent.trim();
            content += text;
            if (text.endsWith(".") || text.endsWith("!") || text.endsWith("?") || text.endsWith(":") || text.endsWith('."')) {
              content += '\n\n';
            }
            else {
              content += ' ';
            }
          }
          else if (node.nodeName.toLowerCase() === 'i') {
            content += node.textContent + ' ';
          }
        });
      }
    }

    if(content === '') {
      content = chapter.textContent;
    }
  } catch (error) {
    //console.log(error);
  }
  return content
}
async function getNovel(novelName, chapter) {
  url = 'https://truyenfull.vn/' + novelName + '/chuong-' + chapter + '/';
  content = await getContent(url);

  novel = new Novel('TruyenFull', content);
  return novel;
}
function getSourceName() {
  return 'TruyenFull'
}

async function searchNovel(keyword) {
  try {
    //console.log(keyword)
    const base_url = 'https://truyenfull.vn/tim-kiem/?tukhoa='
    const url = base_url + keyword
    //console.log(url)
    titles = []
    imageurls = []
    authors = []
    chaps = []
    urls = []
    descriptions = []
    const html = await getHtmlThoughCloudflare(url);
    //console.log(html)
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
      //console.log(title[i].textContent)
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

module.exports = { getNovel, getSourceName, searchNovel };
