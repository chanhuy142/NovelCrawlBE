function createPdfFile(content) {
	const fs = require('fs');
	const pdf = require('pdf-creator-node');
	const path = require('path');
	//create pdf without html file
	var html;
	html = `
    <html>
    <head>
    <style>
    body {
        font-family: Arial, sans-serif;
        font-size: 20px;
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
			contents: '<div style="text-align: center;">NovelCrawl</div>',
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
	pdf
		.create(document, options)
		.then((res) => {
			//return res;
			return res;
		})
		.catch((error) => {
			console.error(error);
		});
}
