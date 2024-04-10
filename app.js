const express = require('express');
const app = express();
app.use(express.json());

const {getListcontroller} = require('./router/hot_plug.js');
app.get('/',async (req, res) => {
    list_controller = getListcontroller();
    content = '';
    
    for (let i = 0; i < list_controller.length; i++) {
        content += await list_controller[i].c1();

    }

    
    
    res.send(content);
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

