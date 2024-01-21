let fs = require('fs');
let path = require('path');
let source = path.join(__dirname, 'files-copy');
let files = path.join(__dirname, 'files');;

fs.rm(source, { recursive: true, force: true }, error => {
    fs.mkdir(source, { recursive: true }, error => {

        console.log(`Successful folder creation ${source}`);
        fs.readdir(files, (error, files) => {
            files.forEach(file => {
                let oldFile = path.join(__dirname, 'files', file);
                let newFile = path.join(__dirname, 'files-copy', file);
                fs.copyFile(oldFile, newFile, error => {
                    if (error) throw error;
                    console.log(`Successful file copy ${file}`);
                });
            });

        });
    });
});