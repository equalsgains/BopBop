chrome.storage.local.set({ info: "awesome" }, function () {
    document.getElementById('saveToken').addEventListener("click", function () {
        //Pull text from user inputbox
        var token = document.getElementById("accesstoken").value;
        //Save it to the localStorage variable which will always remember what you store in it
        localStorage["Access_token"] = token;
        
    });
});

