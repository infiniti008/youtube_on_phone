const fs = require('fs');

let get_next = function(){
    let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
    let next = conf.list_todelete[0];
    return Promise.resolve(next);
}

let delete_next = function(path){
    fs.unlinkSync(path);
    return Promise.resolve(true);        
}

let delete_deleted = function(){
    let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
    let deleted = conf.list_todelete.shift();

    conf.list_local = conf.list_local.filter(function(val){
        return val.webpage_url_basename != deleted.webpage_url_basename;
    });

    fs.writeFileSync(__dirname + '/../conf.json', JSON.stringify(conf));
    return Promise.resolve(deleted);
}

let tick = async function(){
    let next = await get_next();
    if(!next) return false;
    let path_to_delete = next.path + next.filename;
    let delete_state = await delete_next(path_to_delete)
    let deleted = await delete_deleted();
    return true;
}

let ticker = async function(){
    let file_deleted = await tick();
    if(!file_deleted) process.exit(8);
    ticker();
}

ticker();