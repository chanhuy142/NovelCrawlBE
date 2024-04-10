const express = require('express');
const app = express();
const Truyen = require('./models/truyen');
app.use(express.json());

const {getListcontroller} = require('./crawl/hot_plug.js');

app.get('/',async (req, res) => {
    list_controller = getListcontroller();
    var resu = [];
    
    for (let i = 0; i < list_controller.length; i++) {
        truyen= await list_controller[i].c1();
        resu.push(truyen);

    }

    
    
    res.send(resu);
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

