const fs = require('fs');
const youtubedl = require('youtube-dl');

let fl = JSON.parse(fs.readFileSync(__dirname + '/next.json').toString());

let load_file = function(file){
  var video = youtubedl(file.webpage_url, [`--format=${file.format_id}`], { cwd: __dirname + '/../' });
  
  let size = 0;
  video.on('info', function(info) {
    console.log('Download started: ' + info._filename);
    size = info.size;
  });
  
  if (!fs.existsSync(file.path)){
    fs.mkdirSync(file.path);
  }

  video.pipe(fs.createWriteStream(file.path + file.filename));
  
  video.on('end', function() {
    console.log('\nfinished downloading!');
  });

  let pos = 0;
  video.on('data', function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      // var percent = (pos / size * 100).toFixed(2);
      // process.stdout.cursorTo(0);
      // process.stdout.clearLine(1);
      // process.stdout.write(percent + '%');
    }
  });
}

load_file(fl)