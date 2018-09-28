const fs = require('fs');
const cp = require('child_process');

let get_next = function(){
    let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
    let next = conf.list_todownload[0];
    return Promise.resolve(next);
}

let write_next = function(next){
    fs.writeFileSync(__dirname + '/next.json', JSON.stringify(next));
    return Promise.resolve(true);
}

let load_next = function(){
    return new Promise(function(resolve, reject){
        let ln = cp.fork(__dirname + '/load.js');

        ln.on('close', function(code, err){
            console.log('CLOSE FILE LOAD');
            resolve(true);
        })

        ln.on('error', function(code, err){
            console.log('ERROR');
            resolve(false);
        })
    })
}

let delete_loaded = function(){
    let conf = JSON.parse(fs.readFileSync(__dirname + '/../conf.json').toString());
    let loaded = conf.list_todownload.shift();
    conf.list_local.push(loaded);
    fs.writeFileSync(__dirname + '/../conf.json', JSON.stringify(conf));
    return Promise.resolve(loaded);
}

let clear_next = function(){
    fs.writeFileSync(__dirname + '/next.json', JSON.stringify({}));
    return Promise.resolve(true);
}

let tick = async function(){
    let next = await get_next();
    if(next){
        let write_state = await write_next(next);
        let load_state = await load_next();
        if(load_state){
            let loaded = await delete_loaded();
            let clear_state = await clear_next();
            return true;
        }
        else {
            let cleared_next = await clear_next();
            return true;
        }
    } else return false;
}

let ticker = async function(){
    let file_loaded = await tick();
    if(!file_loaded) process.exit(8);
    ticker();
}

ticker();