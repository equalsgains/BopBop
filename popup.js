// $(document).ready(function () {
//     chrome.tabs.getSelected(null, function (tab) {
//         link = tab.url;
//         alert(link);
//         getcourseObj();
//         chrome.tabs.executeScript(tab.id, {
//             "code": 'displayAll();'
//         });
//     });
// });

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { getDomain: true }, function (response) {
        console.log(response);
        linkAddress = response.domain;
    });
});

