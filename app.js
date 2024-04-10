const express = require('express');
const app = express();
const Truyen = require('./models/truyen');
app.use(express.json());

const {getListcontroller} = require('./hotplug/hot_plug.js');

app.get('/',async (req, res) => {
    list_controller = getListcontroller();
    tentruyen=req.query.tentruyen;
    chapter=req.query.chapter;
    //http://localhost:3000/?tentruyen=ngao-the-dan-than&chapter=5
    var resu = [];
    //tentruyen='ngao-the-dan-than';
    //chapter=3;
    
    for (let i = 0; i < list_controller.length; i++) {
        truyen= await list_controller[i].c1(tentruyen,chapter);
        resu.push(truyen);

    }

    
    
    res.send(resu);
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

