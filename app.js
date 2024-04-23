const express = require('express');
const app = express();
const Truyen = require('./models/truyen');
const TruyenDetail2 = require('./models/truyen_detailv2');
const {getDetail} = require('./truyendetailcontroller/truyen_detail_controllerv2');
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

app.get('/source',async (req, res) => {
    list_controller = getListcontroller();
    
    var resu = [];
    
    for (let i = 0; i < list_controller.length; i++) {
        truyen= await list_controller[i].c2();
        resu.push(truyen);
    }
    res.send(resu);
})

app.get('/details',async (req, res) => {
    
    var resu = [];
    resu = await getDetail('https://truyenfull.vn/danh-sach/truyen-hot/');
    //remove all Truyen that have no cover atrribute
    
    
    
    let truyenObject = {
        "TruyenDetail": resu
    };
    let jsonString = JSON.parse(JSON.stringify(truyenObject));
    res.json(jsonString);

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

