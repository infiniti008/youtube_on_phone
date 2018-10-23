function registerSW(){
    console.log('sdfkjb')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('scripts/sw.js');
    }
}

window.addEventListener('load', registerSW)