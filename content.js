course1 = document.URL.substring(document.URL.indexOf("/courses/") + 9), -1 !== course1.indexOf("/") ? course = course1.substring(0, course1.indexOf("/")) : course = course1, chrome.runtime.onMessage.addListener(function(e, o, n) {
    console.log(o.tab ? "from a content script:" + o.tab.url : "from the extension"), 1 == e.getDomain && n({
        domain: document.domain,
        course: course
    })
});