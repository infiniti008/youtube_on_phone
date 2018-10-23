function registerSW(){
    var regSW = require("register-worker.js");
    idxDB.setObject('filesDir', filesDir);
    regSW.registerServiceWorker();
}

window.addEventListener('load', registerSW)