
function getFileType() {
    return 'epub';
}

async function createFile(content, filename, author, coverImage) {
    const Epub = require('epub-gen');
    let filePath = './output.epub';
    var html;
	html = `
    <html>
    <head>
    <style>
    body {
        font-family: "Times New Roman", Times, serif;
        font-size: 25px;
		white-space: pre;
        text-align: justify;
    }
	pre {
		font-family: "Times New Roman", Times, serif;
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
        author: author,
        publisher: "NovelCrawl",
        cover: coverImage,
        content: [
            {
                title: filename,
                data: html,
            }
        ],
    };

    try {
        let epubGen = new Epub(option, filePath);
        await epubGen.promise.then(() => {
            console.log('Ebook Generated Successfully');
        }).catch(err => {
                console.log('Failed to generate Ebook');
            });
    } catch (error) {
        console.log(error);
    }

    return filePath;
}

module.exports = { createFile, getFileType };