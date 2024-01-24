let fs = require('fs');
let path = require('path');
let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf8');
stream.on('readable', function() {
    let data = stream.read();
    if(data != null) {
        console.log(data);
    }
})