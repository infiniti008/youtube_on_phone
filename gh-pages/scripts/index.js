function registerSW(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('scripts/sw.js');
    }
}

window.addEventListener('load', registerSW)