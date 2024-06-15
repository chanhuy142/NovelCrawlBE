var Novel = require('../models/novel');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var cloudscraper = require('cloudscraper');
const NovelDetail = require('../models/novel_detail');
const getHtmlThoughCloudflare = async (url) => {
	const html = await cloudscraper.get(url);
	return html;
};

const getContent = async (url) => {
	try {
		const html = await getHtmlThoughCloudflare(url);
		//console.log(html);
		const dom = new JSDOM(html);
		var gContent = dom.window.document.querySelector('.box-chap');
		if (gContent == null) {
			//console.log(html);
			const dom2 = new JSDOM(html);
			var gContent = dom2.window.document.querySelector('.content'); //.content

			content = gContent.textContent.replace('\t', '');
			return content;
		}
		content = gContent.textContent;
		return content;
	} catch (error) {}
};
async function getNovel(novelName, chapter) {
	//construct url
	url =
		'https://truyen.tangthuvien.vn/doc-truyen/' +
		novelName +
		'/chuong-' +
		chapter +
		'/';
	//console.log(url)

	content = await getContent(url);
	//remove all unnecessary space
	if (content) {
		//remove all unnecessary space
		//content = content.replace(/\s+/g,' ');
	} else {
		console.error('getContent returned undefined');
	}
	novel = new Novel('Tang Thu Vien', content);
	return novel;
}

function getSourceName() {
	return 'Tang Thu Vien';
}
const processChapter = (chapter) => {
	//loop and get textContent
	var res = [];
	for (let i = 0; i < chapter.length; i++) {
		res.push(chapter[i].textContent);
	}

	//chỉ lấy những res nào bắt đầu bằng Số chương

	newres = [];
	for (let i = 0; i < res.length; i++) {
		if (res[i].startsWith('Số')) {
			newres.push(res[i]);
		}
	}
	return newres;
};
async function searchNovel(keyword) {
	//change keyword: ngao+the to ngao%20the
	const standardizedKeyword = keyword.replace(/\s/g, '%20');
	//console.log(standardizedKeyword);
	const base_url = 'https://truyen.tangthuvien.vn/ket-qua-tim-kiem?term=';
	const url2 = base_url + standardizedKeyword;
	try {
		//console.log('aaaaaaaaaaaaaaaaaaaa');
		//console.log(url)
		titles = [];
		imageurls = [];
		authors = [];
		chaps = [];
		urls = [];
		descriptions = [];
		const html = await getHtmlThoughCloudflare(url2);
		const dom = new JSDOM(html);
		//console.log(html);
		res = [];
		var flag = 0;
		var imageurl = dom.window.document.querySelectorAll('.lazy');
		//console.log(imageurl[0].src)
		var title = dom.window.document.querySelectorAll('h4 a');
		var author = dom.window.document.querySelectorAll('.name');
		//console.log(author[0].textContent);
		var chap = dom.window.document.querySelectorAll('.KIBoOgno');
		var url;

		var newchap;
		console.log(title.length);
		if (title.length === 0) {
			console.log('title is empty');
			flag = 1;
			title = dom.window.document.querySelectorAll('h4');
			//console.log(title.length);
			imageurl = dom.window.document.querySelectorAll(
				'.book-item a .story-image img'
			);
			author = dom.window.document.querySelectorAll('.item-author');
			chap = dom.window.document.querySelectorAll('.item-update');
			url = dom.window.document.querySelectorAll('.book-item a');
			newchap = processChapter(chap);
			console.log(newchap);
		}

		var j = 1;
		var k = 2;
		for (let i = 0; i < title.length; i++) {
			try {
				//console.log(title[i].textContent)
				titles.push(title[i].textContent);
				imageurls.push(imageurl[i].src);

				//extract number and add to chaps ex: chuong 1 -> 1
				if (flag === 0) {
					authors.push(author[i].textContent);
					chaps.push(chap[i].textContent.match(/\d+/)[0]);

					const newurl = title[i].getAttribute('href');
					urls.push(title[i].getAttribute('href'));
					html2 = await getHtmlThoughCloudflare(newurl);
					const dom2 = new JSDOM(html2);

					try {
						var description =
							dom2.window.document.querySelector('.book-intro p');
						descriptions.push(description.textContent);
					} catch (error) {
						console.log(error);
						descriptions.push('No description');
					}
				} else {
					//chuong: Số chuơng: 491 => 491

					chaps.push(newchap[i]);
					authors.push(author[j].textContent);
					j = j + 2;
					k = k + 3;
					const newurl = url[i].getAttribute('href');
					urls.push(newurl);
					html2 = await getHtmlThoughCloudflare(newurl);
					//console.log(html2);
					const dom2 = new JSDOM(html2);

					try {
						var description =
							dom2.window.document.querySelector('.book-introduce');
						descriptions.push(description.textContent);
					} catch (error) {
						console.log(error);
						descriptions.push('No description');
					}
				}
				//console.log(description.textContent);
				if(descriptions[i] === undefined){
					descriptions[i] = 'No description';
				}
				novel_detail = new NovelDetail(
					titles[i],
					imageurls[i],
					urls[i],
					authors[i],
					chaps[i],
					descriptions[i]
				);
				//console.log(novel_detail);
				res.push(novel_detail);
			} catch (error) {
				console.log(error);
			}
		}
	} catch (error) {
		console.log(error);
	}
	return res;
}

module.exports = { getNovel, getSourceName, searchNovel };
