const express = require('express');
const app = express();
const Truyen = require('./models/truyen');
const TruyenDetail2 = require('./models/truyen_detailv2');
const {
	getDetail,
} = require('./truyendetailcontroller/truyen_detail_controllerv2');
app.use(express.json());

const { getListcontroller, getListDownloadFile } = require('./hotplug/hot_plug.js');


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

app.post('/download', async (req, res) => {

	list_downloadfile = getListDownloadFile();
	//get content from post request
	content = req.body.content;
	filename = req.body.name;
	fileType = req.body.fileType;
	
	console.log(list_downloadfile[0].getFileType());
	console.log(fileType);
	for (let i = 0; i < list_downloadfile.length; i++) {
		if (list_downloadfile[i].getFileType() === fileType) {
			console.log(fileType);
			list_downloadfile[i].createFile(content, filename)
			.then((result) => {
				console.log(result);
				res.download(result);
			})
			.catch((error) => {
				console.error(error);
			});
		}
	}
	
});


app.get('/filetypes', async (req, res) => {
	list_downloadfile = getListDownloadFile();
	var resu = [];

	for (let i = 0; i < list_downloadfile.length; i++) {
		resu.push(list_downloadfile[i].getFileType());
	}
	let fileTypes = {
		FileType: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(fileTypes));
	res.json(jsonString);
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
