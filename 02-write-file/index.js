let fs = require('fs');
let path = require('path');
let {stdin, stdout, exit} = require('process');
let stream =  new fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Enter whatever you want: \n');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        end();
    }
    stream.write(data);
})
process.on('SIGINT', end);
function end() {
    stdout.write('The end!');
    exit();
}