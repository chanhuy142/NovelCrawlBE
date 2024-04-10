
var getContent = require('../router/crawl_truyenfullv2')
async function  c1(){
    content= await getContent.getContent('https://truyenfull.vn/ngao-the-dan-than/chuong-1/')
    
    return content;
}
module.exports = {c1};