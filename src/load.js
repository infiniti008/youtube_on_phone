const fs = require('fs');
const youtubedl = require('youtube-dl');

let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());

let fl = conf.list_todownload[2];

console.log(fl)

let load_file = function(file){
  var video = youtubedl(file.webpage_url, [`--format=${file.format_id}`], { cwd: __dirname + '/../' });
  
  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started');
  });
  
  let dir = __dirname + '/../videos/' + file.playlist + '/';

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  video.pipe(fs.createWriteStream(dir + file.filename));
  
  video.on('end', function() {
    console.log('finished downloading!');
  });

  let size = file.filesize;
  let pos = 0;
  video.on('data', function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      var percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
  });
}

load_file(fl)