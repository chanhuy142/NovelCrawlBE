const express = require('express');
const app = express();
const Novel = require('./models/novel.js');
const NovelDetail = require('./models/novel_detail.js');
const {
	getDetail,
} = require('./noveldetailcontroller/novel_detail_controller.js');
app.use(express.json());

const { getListcontroller, getListDownloadFile } = require('./hotplug/hot_plug.js');


app.get('/', async (req, res) => {
	list_controller = getListcontroller();
	
	novelName = req.query.novelName;
	chapter = req.query.chapter;
	//http://localhost:3000/?novelName=ngao-the-dan-than&chapter=1
	//http://localhost:3000/?novelName=muc-than-ky&chapter=1
	//
	//http://localhost:3000/?novelName=toan-chuc-phap-su&chapter=5
	//http://localhost:3000/?novelName=de-ba&chapter=5
	var resu = [];

	for (let i = 0; i < list_controller.length; i++) {
		novel = await list_controller[i].getNovel(novelName, chapter);
		resu.push(novel);
	}
	let novelObject = {
		NovelChapter: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(novelObject));
	res.json(jsonString);
});

app.get('/source', async (req, res) => {
	list_controller = getListcontroller();

	var resu = [];

	for (let i = 0; i < list_controller.length; i++) {
		sourceName = await list_controller[i].getSourceName();
		resu.push(sourceName);
	}
	let sourceObject = {
		NovelSource: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(sourceObject));
	res.json(jsonString);
});

app.get('/details', async (req, res) => {
	var resu = [];
	resu = await getDetail('https://truyenfull.vn/danh-sach/truyen-hot/');
	//remove all Truyen that have no cover atrribute

	let novelObject = {
		NovelDetail: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(novelObject));
	res.json(jsonString);
});

app.get('/search', async (req, res) => {
	list_controller = getListcontroller();
	keyword = req.query.keyword;
	var resu = [];

	for (let i = 0; i < list_controller.length; i++) {
		novel = await list_controller[i].searchNovel(keyword);

		resu.push(novel);
	}
	//reverse the array
	resu = resu.reverse();
	//flatten the array
	resu = resu.flat(1);

	let novelObject = {
		NovelDetail: resu,
	};
	let jsonString = JSON.parse(JSON.stringify(novelObject));
	res.json(jsonString);
});

app.post('/download', async (req, res) => {

	list_downloadfile = getListDownloadFile();
	//get content from post request
	content = req.body.content;
	filename = req.body.name;
	fileType = req.body.fileType;
	
	//console.log(list_downloadfile[0].getFileType());
	//console.log(fileType);
	for (let i = 0; i < list_downloadfile.length; i++) {
		if (list_downloadfile[i].getFileType() === fileType) {
			//console.log(fileType);
			list_downloadfile[i].createFile(content, filename)
			.then((result) => {
				//console.log(result);
				res.download(result);
			})
			.catch((error) => {
				//console.error(error);
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
