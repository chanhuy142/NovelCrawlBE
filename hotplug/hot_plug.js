const fs = require('fs');
const path = require('path');

//get dir name

const getListcontroller = () => {
    const dir = path.join(__dirname, '../controller');
    const files = fs.readdirSync(dir);
    let controllers_name = [];
    files.forEach(file => {
        if(file.endsWith('.js'))
            controllers_name.push(file.split('.')[0]);
    });
    //add .js to each controller name
    controllers_name = controllers_name.map(controller => controller + '.js');
    //import all controller
    list_controller = [];
    controllers_name.forEach(controller => {
        //import controller
        const c = require('../controller/' + controller);
        list_controller.push(c);

    });

    return list_controller;
}

const getListDownloadFile =  () => {
    const dir = path.join(__dirname, '../downloadfile_controller');
    const files = fs.readdirSync(dir);
    let controllers_name = [];
    files.forEach(file => {
        if(file.endsWith('.js'))
            controllers_name.push(file.split('.')[0]);
    });
    //add .js to each controller name
    controllers_name = controllers_name.map(controller => controller + '.js');
    //import all controller
    list_controller = [];
    controllers_name.forEach(controller => {
        //import controller
        const c = require('../downloadfile_controller/' + controller);
        list_controller.push(c);

    });

    return list_controller;
}

module.exports = { getListcontroller, getListDownloadFile };