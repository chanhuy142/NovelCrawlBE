var getContent = require('../crawl/crawl_truyenfullv2')
var Truyen = require('../models/truyen')
async function  c1(){
    content= await getContent.getContent('https://truyenfull.vn/ngao-the-dan-than/chuong-2/')
    truyen = new Truyen('blogtruyen',content);
    return truyen;
}
module.exports = {c1};