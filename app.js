const express = require('express');
const app = express();
const Truyen = require('./models/truyen');
const TruyenDetail2 = require('./models/truyen_detailv2');
const {
	getDetail,
} = require('./truyendetailcontroller/truyen_detail_controllerv2');
app.use(express.json());

const { getListcontroller } = require('./hotplug/hot_plug.js');

app.get('/', async (req, res) => {
	list_controller = getListcontroller();
	tentruyen = req.query.tentruyen;
	chapter = req.query.chapter;
	//http://localhost:3000/?tentruyen=ngao-the-dan-than&chapter=1
	//http://localhost:3000/?tentruyen=muc-than-ky&chapter=1
	//
	//http://localhost:3000/?tentruyen=toan-chuc-phap-su&chapter=5
	//http://localhost:3000/?tentruyen=de-ba&chapter=5
	var resu = [];

	for (let i = 0; i < list_controller.length; i++) {
		truyen = await list_controller[i].c1(tentruyen, chapter);
		resu.push(truyen);
	}
	let truyenObject = {
		TruyenChapter: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(truyenObject));
	res.json(jsonString);
});

app.get('/source', async (req, res) => {
	list_controller = getListcontroller();

	var resu = [];

	for (let i = 0; i < list_controller.length; i++) {
		truyen = await list_controller[i].c2();
		resu.push(truyen);
	}
	let truyenObject = {
		TruyenSource: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(truyenObject));
	res.json(jsonString);
});

app.get('/details', async (req, res) => {
	var resu = [];
	resu = await getDetail('https://truyenfull.vn/danh-sach/truyen-hot/');
	//remove all Truyen that have no cover atrribute

	let truyenObject = {
		TruyenDetail: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(truyenObject));
	res.json(jsonString);
});

app.get('/search', async (req, res) => {
	list_controller = getListcontroller();
	//console.log(list_controller.length);
	keyword = req.query.keyword;
	var resu = [];

	for (let i = 0; i < list_controller.length; i++) {
		truyen = await list_controller[i].c3(keyword);

		resu.push(truyen);
	}
	//reverse the array
	resu = resu.reverse();
	//flatten the array
	resu = resu.flat(1);

	let truyenObject = {
		TruyenDetail: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(truyenObject));
	res.json(jsonString);
});

app.get('/download', async (req, res) => {
	//localhost:3000/download?content=hello

	console.log(req.query.content);
	content = req.query.content;
	const fs = require('fs');
	const pdf = require('pdf-creator-node');
	const path = require('path');

	var html;
	html = `
    <html>
    <head>
    <style>
    body {
        font-family: Arial, sans-serif;
        font-size: 12px;
    }
    </style>
    </head>
    <body>
    ${content}
    </body>
    </html>
    `;
	var options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		header: {
			height: '45mm',
		},
		footer: {
			height: '28mm',
		},
	};
	var document = {
		html: html,
		data: {
			content: content,
		},
		path: './output.pdf',
	};
	pdf
		.create(document, options)
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.error(error);
		});

	res.download('./output.pdf');
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
