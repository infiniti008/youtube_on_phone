// var path = require('path');
var fs   = require('fs');
// var ytdl = require('youtube-dl');
 
// function playlist(url) {
 
//   'use strict';
//   var video = ytdl(url);
 
//   video.on('error', function error(err) {
//     console.log('error 2:', err);
//   });
 
//   var size = 0;
//   video.on('info', function(info) {
//       console.log(info)
//       fs.writeFileSync('./sl.json', JSON.stringify(info))
//     size = info.size;
//     var output = path.join(__dirname + '/', size + '.mp4');
//     // video.pipe(fs.createWriteStream(output));
//   });
 
//   var pos = 0;
//   video.on('data', function data(chunk) {
//     pos += chunk.length;
//     // `size` should not be 0 here.
//     if (size) {
//       var percent = (pos / size * 100).toFixed(2);
//       process.stdout.cursorTo(0);
//       process.stdout.clearLine(1);
//       process.stdout.write(percent + '%');
//     }
//   });
 
//   video.on('next', playlist);
 
// }
 
// playlist('https://www.youtube.com/playlist?list=PL6UGpD5TQQLea0Tdyvg5DMN5gcv-m2diw');
// // playlist('https://www.youtube.com/watch?v=5ym_P7YtV4I');




var youtubedl = require('youtube-dl');
var url = 'https://www.youtube.com/playlist?list=PL6UGpD5TQQLea0Tdyvg5DMN5gcv-m2diw';
// Optional arguments passed to youtube-dl.
var options = ['--username=user', '--password=hunter2'];
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err;
  fs.writeFileSync('./sl.json', JSON.stringify(info))
  console.log(Object.keys(info));
  // console.log('title:', info.title);
  // console.log('url:', info.url);
  // console.log('thumbnail:', info.thumbnail);
  // console.log('description:', info.description);
  // console.log('filename:', info._filename);
  // console.log('format id:', info.format_id);
});