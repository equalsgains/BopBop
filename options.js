document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.set({
        info: "awesome"
    }, function() {
        saveT = document.getElementById("saveToken"), saveT.addEventListener("click", function() {
            var e = $("#accesstoken").val();
            localStorage.Access_token = e, $("#accesstoken").val(""), $("input[type='text']").fadeOut(), $(this).fadeOut(), $("#tokenTitle").fadeOut(), $("#saveMessage").removeClass("hideItem"), $("#saveMessage").fadeOut("fast"), $("#saveMessage").fadeIn("slow"), $("#saveToken").fadeOut("fast"), console.log("you entered " + $("#accesstoken").val()), $("#saveMessage").slideDown(), $("#resetMessage").slideUp(), $(this).val(""), $("#resetToken").slideDown(), $("input[type='text']").val()
        })
    }), console.log("loaded"), $("#resetToken").on("click", function() {
        $("#accesstoken").val(""), localStorage.clear(), console.log("token has been cleared"), $("#accesstoken").fadeIn(), $(this).fadeOut(), $("#resetMessage").slideDown(), $("#saveMessage").fadeOut(), $("#tokenTitle").fadeIn(), $("#saveToken").fadeIn("fast")
    }), $("input[type='text']").keypress(function(e) {
        13 === e.which && "" !== $(this).val() ? ($(this).fadeOut(), $("#tokenTitle").fadeOut(), $("#saveMessage").removeClass("hideItem"), $("#saveMessage").fadeOut("fast"), $("#saveMessage").fadeIn("slow"), $("#saveToken").fadeOut("fast"), localStorage.Access_token = $(this).val(), console.log("you entered " + $(this).val()), $("#saveMessage").slideDown(), $("#resetMessage").slideUp(), $(this).val(""), $("#resetToken").slideDown()) : 13 === e.which && "" === $(this).val() && alert("We both know it won't work without your token!")
    })
});