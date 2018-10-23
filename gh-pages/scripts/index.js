function registerSW(){
    var regSW = importScripts("register-worker.js");
    idxDB.setObject('filesDir', filesDir);
    regSW.registerServiceWorker();
}

window.addEventListener('load', registerSW)