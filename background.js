chrome.browserAction.onClicked.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "tokenButton":
            // execute the content script
            chrome.tabs.executeScript(null, { // defaults to the current tab
                file: "setToken.js", // script to inject into page and run in sandbox
                allFrames: false // This injects script into iframes in the page and doesn't work before 4.0.266.0.
            });
            sendResponse({}); // sending back empty response to sender
            break;
  
        case "retriever":
            // execute the content script
            chrome.tabs.executeScript(null, { // defaults to the current tab
                file: "popup.js", // script to inject into page and run in sandbox
                allFrames: false // This injects script into iframes in the page and doesn't work before 4.0.266.0.
            });
            sendResponse({}); // sending back empty response to sender
            break;
        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);