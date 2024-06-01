async function createFile(content, filename) {
	const fs = require('fs');
	const pdf = require('pdf-creator-node');
	const path = require('path');

	let filePath = './output.pdf';
	//create pdf without html file
	var html;
	html = `
    <html>
    <head>
    <style>
    body {
        font-family: Georgia, Arial, sans-serif;
        font-size: 25px;
		white-space: pre;
    }
	pre {
		font-family:  Georgia, Arial, sans-serif;
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
	var options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		header: {
			height: '45mm',
			contents: '<div style="text-align: center;">'+filename+'</div>',
		},
		footer: {
			height: '28mm',
			contents: {
				first: 'Cover page',
				2: 'Second page', // Any page number is working. 1-based index
				default:
					'<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
				last: 'Last Page',
			},
		},
	};
	var document = {
		html: html,
		data: {
			content: content,
		},
		path: './output.pdf',
	};
	await pdf
		.create(document, options)
		.catch((error) => {
			console.error(error);
		});

	return filePath;
}

function getFileType() {
	return 'pdf';
}

module.exports = { createFile, getFileType};