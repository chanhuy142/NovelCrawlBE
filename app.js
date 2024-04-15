const express = require('express');
const app = express();
const Truyen = require('./models/truyen');
const TruyenDetail = require('./models/truyen_detail');
const {getTruyenDetails} = require('./truyendetailcontroller/truyen_detail_controller');
app.use(express.json());

const {getListcontroller} = require('./hotplug/hot_plug.js');

app.get('/',async (req, res) => {
    list_controller = getListcontroller();
    tentruyen=req.query.tentruyen;
    chapter=req.query.chapter;
    //http://localhost:3000/?tentruyen=ngao-the-dan-than&chapter=1
     //http://localhost:3000/?tentruyen=muc-than-ky&chapter=1
     //
     //http://localhost:3000/?tentruyen=toan-chuc-phap-su&chapter=5
     //http://localhost:3000/?tentruyen=de-ba&chapter=5
    var resu = [];
    
    for (let i = 0; i < list_controller.length; i++) {
        truyen= await list_controller[i].c1(tentruyen,chapter);
        resu.push(truyen);
    }
    res.send(resu);
})

app.get('/details',async (req, res) => {
    
    var resu = [];
    resu = await getTruyenDetails('https://truyenfull.vn/danh-sach/truyen-hot/');
    //remove all Truyen that have no cover atrribute
    resu2 = resu.filter(function (el) {
        return el.cover != null;
    });
    
    
    let truyenObject = {
        "TruyenDetail": resu2
    };
    let jsonString = JSON.parse(JSON.stringify(truyenObject));
    res.json(jsonString);

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

