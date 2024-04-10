var getContent = require('../crawl/crawl_truyenfullv2')
var Truyen = require('../models/truyen')
async function  c1(tentruyen,chapter){
    url='https://truyenfull.vn/'+tentruyen+'/chuong-'+chapter+'/';
    content= await getContent.getContent(url)
    truyen = new Truyen('nettruyen',content);

    
    return truyen;
}
module.exports = {c1};