const fs = require('fs');
let pl_info;

let get = function(){
  const youtubedl = require('youtube-dl');
  
  let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
  let url = conf.urls.playlist_later;
  
  // Optional arguments passed to youtube-dl.
  let options = ['--username=user', '--password=hunter2'];
  if(conf.local_test){
    return Promise.resolve(true);
  } else {
    return new Promise(function(resolve, reject){
      youtubedl.getInfo(url, options, function(err, info) {
        if (err) {
          console.log(err);
          resolve(false);
        }
        else{
          // fs.writeFileSync(__dirname + '/playlist_info.json', JSON.stringify(info));
          pl_info = info;
          resolve(true);
        }
      });
    }) 
  }
  
}

let parse = function(){
	let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
  // const info = JSON.parse(fs.readFileSync(__dirname + '/playlist_info.json').toString());
  const info = pl_info;

  let ytarr = [];
	for(let obj of info){
		let result = {};
    
    result.format = obj.format;
    result.ext = obj.ext;
    
    let to_slice = obj.webpage_url_basename.length + obj.ext.length + 2;
    result.filename = obj._filename.slice(0, -to_slice) + '.' + obj.ext;

    result.format_id = obj.format_id;
		result.webpage_url = obj.webpage_url;
    result.webpage_url_basename = obj.webpage_url_basename;
    result.playlist = obj.playlist;
    result.path = conf.dir_path + obj.playlist + '/';
    
    ytarr.push(result);
  }
  
  let toarr = [];

  toarr = ytarr.filter(function(val){
    return !conf.list_local.some(function(local_val){
      return local_val.webpage_url_basename == val.webpage_url_basename;
    })
  })

  conf.list_todownload = toarr;

	fs.writeFileSync(__dirname + '/../conf.json', JSON.stringify(conf));
	return Promise.resolve(conf);
}

let list_cunstruct = async function(){
  let playlist_got = await get();
  if(playlist_got){
    let conf = await parse();
    process.exit(8);
  } else {
    process.exit(9);
  }
} 

list_cunstruct();