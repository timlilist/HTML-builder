let fs = require('fs');
let path = require('path');
let source = path.join(__dirname, 'project-dist');
let fsP = require('fs').promises;

let oldFile = path.join(__dirname, 'template.html');
let newFile = path.join(__dirname, 'project-dist', 'index.html');
let parts = path.join(__dirname, 'components');

let assetsDest = path.join(__dirname, 'project-dist', 'assets');;
let assetsSrc = path.join(__dirname, 'assets');

async function htmlBuilder() {
    let templateData = (await fsP.readFile(oldFile)).toString();
    let componentFiles = await fsP.readdir(parts)
    for (f of componentFiles) {
        let fPath = path.join(parts, f)
        let fStat = await fsP.stat(fPath)
        if (fStat.isFile()) {
            let extension = path.extname(f);
            let fileName = path.basename(f, extension);
            let fData = (await fsP.readFile(fPath)).toString();
            let tag = `{{${fileName}}}`;
            templateData = templateData.replaceAll(tag, fData)
            await fsP.writeFile(newFile, templateData)
        }
    }
}

async function cssBuilder() {
    let sourceStyle = path.join(__dirname, 'project-dist', 'style.css');
    let filesStyle = path.join(__dirname, 'styles');
    fs.rm(sourceStyle, { recursive: true, force: true }, (error) => {
        fs.readdir(filesStyle, (error, filesStyle) => {
            filesStyle.forEach(file => {
                let extension = path.extname(file);
                if (extension === '.css') {
                    let oldFileStyle = path.join(__dirname, 'styles', file);
                    fs.readFile(oldFileStyle, (error, data) => {
                        if (error) throw error;
                        fs.appendFile(sourceStyle, data, error => {
                            if (error) throw error;
                            console.log(`Merge completed successfully ${file}`);
                        });
                    })
                }
            });

        });
    })
}


async function copyDir(src, dest) {
    let entries = await fsP.readdir(src, { withFileTypes: true });
    await fsP.mkdir(dest);
    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fsP.copyFile(srcPath, destPath);
        }
    }
}


async function projectBuilder() {
    await fsP.rm(source, { recursive: true, force: true });
    await fsP.mkdir(source, { recursive: true });
    htmlBuilder();
    cssBuilder();
    copyDir(assetsSrc, assetsDest);
}

projectBuilder();