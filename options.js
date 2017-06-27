document.addEventListener("DOMContentLoaded", function () {

    chrome.storage.local.set({ info: "awesome" }, function () {
        saveT = document.getElementById('saveToken');
        saveT.addEventListener("click", function () {
            //Pull text from user inputbox
            var token = $('#accesstoken').val();
            //Save it to the localStorage variable which will always remember what you store in it
            chrome.storage.local.set ({
                Access_token: token
            }, function () {
                alert("it got");
            } )
            $('#accesstoken').val("");
            $("input[type='text']").fadeOut();
            $(this).fadeOut();
            $("#tokenTitle").fadeOut();
            $("#saveMessage").removeClass("hideItem");
            $("#saveMessage").fadeOut("fast");
            $("#saveMessage").fadeIn("slow");
            $("#saveToken").fadeOut("fast");
            // add the value to local storage when enter key is pressed
            $("#saveMessage").slideDown();
            $('#resetMessage').slideUp();
            $(this).val("");
            $('#resetToken').slideDown();
            $("input[type='text']").val() === "";


        });

    });
    console.log("loaded");

    $("#resetToken").on('click', function () {
        $('#accesstoken').val("");
        localStorage.clear();
        console.log("token has been cleared");
        $('#accesstoken').fadeIn();
        $(this).fadeOut();
        $("#resetMessage").slideDown();
        $('#saveMessage').fadeOut();
        $('#tokenTitle').fadeIn();
        $("#saveToken").fadeIn("fast");
    });

    $("input[type='text']").keypress(function (e) {
        if (e.which === 13 && $(this).val() !== "") {
            // fade out the input when the token has been submitted
            $(this).fadeOut();
            $("#tokenTitle").fadeOut();
            $("#saveMessage").removeClass("hideItem");
            $("#saveMessage").fadeOut("fast");
            $("#saveMessage").fadeIn("slow");
            $("#saveToken").fadeOut("fast");

            // add the value to local storage when enter key is pressed
            // localStorage["Access_token"] = $(this).val();
            chrome.storage.local.set ({
                Access_token: $(this).val()
            }, function () {
                alert("it got");
            } )
            $("#saveMessage").slideDown();
            $('#resetMessage').slideUp();
            $(this).val("");
            $('#resetToken').slideDown();
        } else if (e.which === 13 && $(this).val() === "") {
            alert("We both know it won't work without your token!");
        }
    });
});


