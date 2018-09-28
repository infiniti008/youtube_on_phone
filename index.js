const list = require('./src/list');

const error_Listener = function(err){
  console.log(err);
}

list.get(true)
  .then(list.parse)
  .then(list.todownload)
  .catch(error_Listener)