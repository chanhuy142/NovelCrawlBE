var getContent = require('../crawl/crawl_truyenfullv2')
var Truyen = require('../models/truyen')
async function  c1(){
    content= await getContent.getContent('https://truyenfull.vn/ngao-the-dan-than/chuong-3/')
    truyen = new Truyen('nettruyen',content);

    
    return truyen;
}
module.exports = {c1};