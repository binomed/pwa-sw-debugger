(()=>{

  if (typeof window != 'undefined') {
      window.browserObject = window.browser !== undefined ? browser : chrome;
  } else {
      browserObject = chrome;
  }


    console.log('Hello from PWA SW Debugger content script');
    

    function handleMessage(request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension", request);
      if (request.greeting === "hello"){
        //sendResponse({farewell: "goodbye"});

        console.log("ask for registration");
        navigator.serviceWorker.getRegistration().then(function(registration) {
            console.log('registration', registration);
          sendResponse(registration)
        });
      }
    }

  /**
  Listen for messages from our devtools panel.
  */
  browserObject.runtime.onMessage.addListener(handleMessage); 
})()


window.addEventListener('message', function(event) {
  console.log('got message in content', event);

  console.log('check registratio from content')
  navigator.serviceWorker.getRegistration().then(function(registration) {
    console.log('registration from content', registration);
    let browserObject2 = window.browser !== undefined ? browser : chrome;
    browserObject2.runtime.sendMessage({resp:"ok",registration});
});
});