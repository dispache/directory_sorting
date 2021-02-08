const fs = require('fs');

const directoryPath = process.argv[2];

const directorySort = (directoryPath) => {
	
	const files = fs.readdirSync(directoryPath);
	
	if ( !files.includes('scripts')) {
		fs.mkdirSync(directoryPath + '/scripts');
	}
	if ( !files.includes('text files') ) {
		fs.mkdirSync(directoryPath + '/text files');
	}
	if ( !files.includes('documents') ) {
		fs.mkdirSync(directoryPath + '/documents');
	}

	if ( files.every( el => el.split('.').length === 1) ) {
		console.log('Directory contains no files :)');
		return;
	} 

	else {
		files.forEach( file => {
			let newFilePath;
			let oldFilePath = directoryPath + `/${file}`;
			if ( file.endsWith('txt') ) {
				newFilePath = directoryPath + '/text files/' + file;
				copyFile(oldFilePath, newFilePath);
			} else if ( file.endsWith('js') ) {
				newFilePath = directoryPath + '/scripts/' + file;
				copyFile(oldFilePath, newFilePath);
			} else if ( file.endsWith('pdf') || file.endsWith('docx') ) {
				newFilePath = directoryPath + '/documents/' + file;
				copyFile(oldFilePath, newFilePath);
			}
		});
		console.log('Directory was sorted :)');
	}
};

const copyFile = (oldPath,newPath) => {
	 	
	 	let readStream = fs.createReadStream(oldPath);
        let writeStream = fs.createWriteStream(newPath);

        readStream.on('error', (err) => console.log('Oops.. error :('))

        readStream.on('close', function () {
            fs.unlink(oldPath, (err) => { if (err) console.log(err)});
        });

        readStream.pipe(writeStream);
}

directorySort(directoryPath);