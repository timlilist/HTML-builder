let fs = require('fs');
let path = require('path');

fs.readdir(
    path.resolve(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (error, files) => {
    if (error) {
      console.log(error);
    } else {
        files.forEach(file => {
            if (file.isFile()) {
                fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
                    if (error) {
                        console.log(error);
                    }
                    let fileName = path.parse(path.resolve(__dirname, 'secret-folder', file.name)).name;
                    let fileExtension = path.extname(file.name).slice(1);
                    let fileSize = stats.size;
                    console.log(`${fileName} - ${fileExtension} - ${fileSize} bytes`);
                });
            };
        });
    };
});