console.log('Hello from PWA SW Debugger inject script');


document.querySelectorAll('img').forEach(function(img){
    img.style.display = 'none';
});
navigator.serviceWorker.getRegistration().then(function(registration) {
    console.log('registration', registration);
    let browserObject2 = window.browser !== undefined ? browser : chrome;
    browserObject2.runtime.sendMessage({resp:"ok",registration});
});

window.postMessage({
    greeting: 'hello there!',
    source: 'my-devtools-extension'
  }, '*');