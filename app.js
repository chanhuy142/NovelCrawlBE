const express = require('express');
const app = express();
app.use(express.json());

const {getListcontroller} = require('./router/hot_plug.js');
app.get('/', (req, res) => {
    list_controller = getListcontroller();
    content='';
    list_controller.forEach(controller => {
        
        content += controller.c1();
        //new line
        content += '\n';
    });
    res.send(content);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

