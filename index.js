const cp = require('child_process');
let in_process = false;

let create_list = function(){
  return new Promise(function(resolve){
    let list_child = cp.fork(__dirname + '/src/list.js');

    list_child.on('close', function(code){
        console.log('CLOSE GET LIST');
        // console.log(code);
        resolve(true);
    })
  
    list_child.on('error', function(code, err){
        console.log('ERROR');
        resolve(false);
    })
  })
}

let load_files =function(){
  return new Promise(function(resolve){
    let load_child = cp.fork(__dirname + '/src/load_files.js')
    load_child.on('close', function(code){
      console.log('CLOSE ALL FILES LOAD');
      // console.log(code);
      resolve(true);
    })

    load_child.on('error', function(code, err){
        console.log('ERROR');
        resolve(false);
    })
  })
}

let processor = async function(){
  if(!in_process){
    console.log("IN PROCESSOR")
    in_process = true;
    let list_process = await create_list();
    // TODO - Exeption
    if(!list_process) return;
    let load_process = await load_files();
    in_process = false;
  }
}

let cycle = function(){
  processor();
  let cycle_timer = setTimeout(cycle, 1000 * 60 * 2)
}

cycle();