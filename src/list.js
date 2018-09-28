const fs = require('fs');

let get = function(test){
  const youtubedl = require('youtube-dl');
  
  let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
  let url = conf.urls.playlist_later;
  
  // Optional arguments passed to youtube-dl.
  let options = ['--username=user', '--password=hunter2'];
  if(test){
    return Promise.resolve()
  } else {
    return new Promise(function(resolve, reject){
      youtubedl.getInfo(url, options, function(err, info) {
        if (err) {
          reject(err);
        }
        else{
          fs.writeFileSync(__dirname + '/playlist_info.json', JSON.stringify(info));
          resolve();
        }
      });
    }) 
  }
  
}

let parse = function(){
	const _ = require('lodash');

	let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
	const info = JSON.parse(fs.readFileSync(__dirname + '/playlist_info.json').toString());

	const formats_range = [137,246,136,245,135,244,134,243,133,242,132,241];

  let ytarr = [];
	for(let obj of info){
		let result = {};
		let position_in_top = 11;
		for(let val of obj.formats){
			let position_current = formats_range.indexOf(val.format_id * 1)
			if(position_current != -1 && position_current < position_in_top){
				position_in_top = position_current;
				result = _.pick(val, ['format', 'height', 'format_id', 'container', 'vcodec', 'width', 'ext', 'filesize']);
        let to_slice = obj.webpage_url_basename.length + result.ext.length + 2;
        result.filename = obj._filename.slice(0, -to_slice) + '.' + val.ext;
			}
		}
		result.webpage_url = obj.webpage_url;
    result.webpage_url_basename = obj.webpage_url_basename;
    result.playlist = obj.playlist;
    
    ytarr.push(result);
  }
  
  conf.list_youtube = ytarr;
	// console.log(conf.list_youtube)

	fs.writeFileSync(__dirname + '/../conf.json', JSON.stringify(conf));
	return Promise.resolve(conf);
}

let todownload = function(){
  let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());

  let toarr = [];

  toarr = conf.list_youtube.filter(function(val){
    return !conf.list_local.some(function(local_val){
      return local_val.webpage_url_basename == val.webpage_url_basename;
    })
  })

  conf.list_todownload = toarr;

	fs.writeFileSync(__dirname + '/../conf.json', JSON.stringify(conf));
}

module.exports = {
  get: get,
  todownload: todownload,
  parse: parse
}