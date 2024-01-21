let fs = require('fs');
let path = require('path');
let source = path.join(__dirname, 'project-dist', 'bundle.css');
let files = path.join(__dirname, 'styles');
fs.rm(source, { recursive: true }, (error) => {
    fs.readdir(files, (error, files) => {
        files.forEach(file => {
            let fileExtension = path.extname(file);
            if (fileExtension === '.css') {
                let oldFile = path.join(__dirname, 'styles', file);
                fs.readFile(oldFile, (error, data) => {
                    if (error) throw error;
                    fs.appendFile(source, data, error => {
                        if (error) throw error;
                        console.log(`Merge completed successfully ${file}`);
                    });
                });

            };
        });

    });
});