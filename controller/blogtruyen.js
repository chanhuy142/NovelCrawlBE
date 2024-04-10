var getContent = require('../crawl/crawl_truyenfullv2')
var Truyen = require('../models/truyen')
async function  c1(tentruyen,chapter){
    //construct url
    url='https://truyenfull.vn/'+tentruyen+'/chuong-'+chapter+'/';
    content= await getContent.getContent(url)
    truyen = new Truyen('blogtruyen',content);
    return truyen;
}
module.exports = {c1};