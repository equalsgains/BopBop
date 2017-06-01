// chrome.storage.local.set({ info: "awesome" }, function () {
//     document.getElementById('saveToken').addEventListener("click", function () {
//         //Pull text from user inputbox
//         var token = document.getElementById("accesstoken").value;
//         //Save it to the localStorage variable which will always remember what you store in it
//         localStorage["Access_token"] = token;

//     });

// });


document.addEventListener("DOMContentLoaded", function () {
    console.log("loaded");

    $("#resetToken").on('click', function(){
        localStorage.clear();
        console.log("token has been cleared");
        $('#accesstoken').fadeIn();
        $(this).fadeOut();
        $("#resetMessage").slideDown();
        $('#saveMessage').fadeOut();
        $('#tokenTitle').fadeOut();
    });

    $("input[type='text']").keypress(function (e) {
        if (e.which === 13 && $(this).val() !== "") {
            // fade out the input when the token has been submitted
            $(this).fadeOut();
            $("#tokenTitle").fadeOut();
            // add the value to local storage when enter key is pressed
            localStorage["Access_token"] = $(this).val();
            console.log("you entered " + $(this).val());
            $("#saveMessage").slideDown();
            $('#resetMessage').slideUp();
            $(this).val("");
            $('#resetToken').slideDown();
        } else if (e.which === 13 && $(this).val() === "") {
            alert("We both know it won't work without your token!");
        }
    });
});


