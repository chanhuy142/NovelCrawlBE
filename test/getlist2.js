const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const TruyenDetail = require('../models/truyen_detail')
var cloudscraper = require('cloudscraper');
url='https://truyenfull.vn/danh-sach/truyen-hot/'
base_url='https://truyenfull.vn/'
//chuẩn hóa tên truyện: vd: TỰ CẨM -> tu-cam
//removeVietnameseTones: remove dấu tiếng việt
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}
const standardizeName = (name) => {

    
    res= removeVietnameseTones(name)
    res= res.toLowerCase().replace(/ /g, '-');
    return res
  }
const getHtmlThoughCloudflare = async (url) => {
    try {
      const html = await cloudscraper.get(url);
      return html;
    } catch (error) {
      //console.log(error);
    }

  }


const getTitle = async (url) => {
      try {
        tittles=[]

        const html = await getHtmlThoughCloudflare(url);
        const dom = new JSDOM(html);
        //get ALL h4 tag

        var content = dom.window.document.querySelectorAll('.truyen-title a');
        //for each, get textContent
        for (let i = 0; i < content.length; i++) {
          
          
          //console.log(content[i].textContent);
          tittles.push(content[i].textContent)
        }
        //remove Tình trạng,Thể loại,Xếp hạng,Thời gian,Số chương,Sắp xếp theo,Tags
        //content = Array.from(content).slice(7)
      } catch (error) {
        //console.log(error);

      }
      return tittles
  }

  const getTitles = async (url) => {
    urls=[]
    for (let i = 1; i < 3; i++) {
      urls.push(url+'trang-'+i)
    }
    console.log(urls);
    contents=[]
    for (let i = 0; i < urls.length; i++) {
      content= await getTitle(urls[i])
      content.forEach(function(element){
        contents.push(element)
      })
    }
    return contents
  }

  const getImage = async (url) => {
    const html = await getHtmlThoughCloudflare(url);
   try {
    
    //console.log(html);
    const dom = new JSDOM(html);
    //get img
   Content = dom.window.document.querySelector('img');
   //console.log(html);
   source=Content.src;
  //console.log(source);
  return source
   } catch (error) {
      //console.log(html);
    }
}
 
  const getTruyenDetails = async (url) => {
    images=[]
    list_truyen=[]

    try {
      
      const titles = await getTitles(url)
      
      for (let i = 0; i < titles.length; i++) {
        
        const image = await getImage(base_url+standardizeName(titles[i]))
        console.log(image);
        images.push(image)
        
        truyen_detail = new TruyenDetail(
          titles[i],
         image,
         base_url+standardizeName(titles[i])
        )
        list_truyen.push(truyen_detail)
       
      }
      return list_truyen
    } catch (error) {
        //console.log(error);
    }
  }

  getTruyenDetails(url).then((res) => {
    console.log(res);
  })