
function getFileType() {
	return 'epub';
}

async function createFile(content, filename) {
  const epub = require('epub-gen');

  let filePath = './output.epub';

  var html;
	html = `
    <html>
    <head>
    <style>
    body {
        font-family: "Comic Sans MS", cursive, sans-serif;
        font-size: 25px;
		white-space: pre;
    }
	pre {
		font-family: "Comic Sans MS", cursive, sans-serif;
		font-size: 25px;
		word-wrap: break-word;
		white-space: pre-wrap;
		text-align: justify;
	}
    </style>
    </head>
    <body>
    <pre>${content}</pre>
    </body>
    </html>
    `;

  const option = {
      title: filename,
      author: "NovelCrawl",
      publisher: "NovelCrawl",
      output: filePath,
      content: [
          {
              title: filename,
              data: '<pre>' + content + '</pre>'
          }
      ],
  };

    try {
        let epubGen = new epub(option);
        await epubGen.promise.then(() => {
            console.log('Ebook Generated Successfully');
        })
        .catch(err => {
            console.error(err);
        });
    } catch (error) {
        console.error(error);
    }

    return filePath;

}

module.exports = { createFile, getFileType};