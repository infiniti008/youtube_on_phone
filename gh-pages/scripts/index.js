function registerSW(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('gh-pages/scripts/sw.js');
    }
}

window.addEventListener('load', registerSW)