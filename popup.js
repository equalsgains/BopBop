function checkIfDone() {
    sectionsDone !== !1 && ($("#loadingD").addClass("hideItem"), $("#retrieve").removeClass("hideItem"), $("#retrieve").fadeOut(300), $("#retrieve").fadeIn("slow"))
}

function reload() {
    t = setTimeout(function() {
        location.reload()
    }, 1e3)
}

function startInterval() {
    "" == domain && void 0 == access_token == 0 ? reload() : clearTimeout(t)
}

function spitAllinfo() {
    spitCourseInfo(), spitSectionsInfo(), spitTermInfo(), overrides.hasOwnProperty("StudentEnrollment") === !0 && spitStudentTerm(), overrides.hasOwnProperty("TeacherEnrollment") === !0 && spitTeacherTerm(), overrides.hasOwnProperty("TaEnrollment") === !0 && spitTATerm()
}

function spitCourseInfo() {
    var a = new Date,
        e = new Date(c.start_at),
        s = new Date(c.end_at);
    null == c.start_at && (e = " Nada"), null == c.end_at && (s = " Nada"), e > a && " Nada" !== e ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/courses/" + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-graduation-cap fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + c.name + '"></div><li><span class="StartEnd redText">Start</span> ' + e + '</li><li><span class="StartEnd">End</span> ' + s + "</li>") : a > s && " Nada" !== s ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/courses/" + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-graduation-cap fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + c.name + '"></div><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd redText">End</span> ' + s + "</li>") : $("#container").append('<a class="slide-fade show" href=https://' + domain + "/courses/" + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><p>Looks Good! 🙌 </p><i class="fa fa-graduation-cap fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + c.name + '"></div><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd">End</span> ' + s + "</li>")
}

function spitTermInfo() {
    var a = new Date,
        e = new Date(t.start_at),
        s = new Date(t.end_at);
    null == t.start_at && (e = " Nada"), null == t.end_at && (s = " Nada"), e > a && " Nada" !== e ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + t.name + '"></div><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd">End</span> ' + s + "</li>") : a > s && " Nada" !== s ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + t.name + '"></div><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd redText">End</span> ' + s + "</li>") : $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + t.name + '"></div><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd">End</span> ' + s + "</li>")
}

function spitSectionsInfo() {
    for (var a = 0; a < s.length; a++) {
        var e = new Date(s[a].start_at),
            t = new Date(s[a].end_at);
        null == s[a].start_at && (e = " Nada"), null == s[a].end_at && (t = " Nada"), e > today && " Nada" !== e ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/courses/" + courseNum + "/sections/" + s[a].sectionId + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><li><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + s[a].name + '"></li><li><span class="StartEnd redText">Start</span> ' + e + '</li><li><span class="StartEnd">End</span> ' + t + "</li></div>") : today > t && " Nada" !== t ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/courses/" + courseNum + "/sections/" + s[a].sectionId + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><li><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + s[a].name + '"></li><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd redText">End</span> ' + t + "</li></div>") : $("#container").append('<a class="slide-fade show" href=https://' + domain + "/courses/" + courseNum + "/sections/" + s[a].sectionId + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><p>Looks Good! 🙌 </p><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><li><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + s[a].name + '"></li><li><span class="StartEnd">Start</span> ' + e + '</li><li><span class="StartEnd">End</span> ' + t + "</li></div>")
    }
}

function spitRecentTeacher() {
    $("#container").append("<a href=https://" + domain + "/users/" + teacherObj[0].id + '/ target=_blank><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Teacher</h1><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">' + teacherObj[0].name + '</div><li><input id="copy-text" tabindex="1" autocomplete="off" type="text" value=' + tEmail + '></li><li><input id="copy" value="copy" type="submit"></li>'), $("#copy").on("click", function() {
        $("#copy-text").select(), document.execCommand("copy"), console.log("clicked")
    })
}

function spitStudentTerm() {
    var a = new Date(overrides.StudentEnrollment.start_at),
        e = new Date(overrides.StudentEnrollment.end_at);
    null == overrides.StudentEnrollment.start_at && (a = " Nada"), null == overrides.StudentEnrollment.end_at && (e = " Nada"), console.log(overrides.StudentEnrollment.start_at), a > today && " Nada" !== a ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Students can access from:</div><li><span class="StartEnd redText">Start</span> ' + a + '</li><li><span class="StartEnd">End</span> ' + e + "</li>") : today > e && " Nada" !== e ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Students can access from:</div><li><span class="StartEnd">Start</span> ' + a + '</li><li><span class="StartEnd redText">End</span> ' + e + "</li>") : $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Students can access from:</div><li><span class="StartEnd">Start</span> ' + a + '</li><li><span class="StartEnd">End</span> ' + e + "</li>")
}

function spitTeacherTerm() {
    var a = new Date(overrides.TeacherEnrollment.start_at),
        e = new Date(overrides.TeacherEnrollment.end_at);
    null == overrides.TeacherEnrollment.start_at && (a = " Nada"), null == overrides.TeacherEnrollment.end_at && (e = " Nada"), a > today && " Nada" !== a ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd redText">Start</span> ' + a + '</li><li><span class="StartEnd">End</span> ' + e + "</li>") : today > e && " Nada" !== e ? ($("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd">Start</span> ' + a + '</li><li><span class="StartEnd redText">End</span> ' + e + "</li>"), console.log("should be once")) : $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd">Start</span> ' + a + '</li><li><span class="StartEnd">End</span> ' + e + "</li>")
}

function spitTATerm() {
    var a = new Date(overrides.TaEnrollment.start_at),
        e = new Date(overrides.TaEnrollment.end_at);
    null == overrides.TaEnrollment.start_at && (a = " Nada"), null == overrides.TaEnrollment.end_at && (e = " Nada"), a > today && " Nada" !== a ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd redText">Start</span> ' + a + '</li><li><span class="StartEnd">End</span> ' + e + "</li>") : today > e && " Nada" !== e ? $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">TAs can access from:</div><li><span class="StartEnd">Start</span> ' + a + '</li><li><span class="StartEnd redText">End</span> ' + e + "</li>") : $("#container").append('<a class="slide-fade show" href=https://' + domain + "/accounts/" + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">TAs can access from:</div><li><span class="StartEnd">Start</span> ' + a + '</li><li><span class="StartEnd">End</span> ' + e + "</li>")
}
var domDomain = document.domain;
$("#optionsLink").attr("href", "chrome-extension://" + domDomain + "/options.html"), $("#overlayOptions").attr("href", "chrome-extension://" + domDomain + "/options.html"), $("#overlayOptions1").attr("href", "chrome-extension://" + domDomain + "/options.html"), document.getElementById("refreshTab").onclick = function() {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(a) {
        chrome.tabs.update(a[0].id, {
            url: a[0].url
        })
    }), location.reload()
}, document.getElementById("refreshTab1").onclick = function() {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(a) {
        chrome.tabs.update(a[0].id, {
            url: a[0].url
        })
    }), location.reload()
};
var access_token = localStorage.Access_token,
    c = {},
    t = {},
    s = [],
    info = {},
    domain = "",
    courseNum = "",
    teachers = [],
    recentTeacher = "",
    teacherObj = {},
    teacherID = "",
    t, sectionsDone = !1,
    tEmail = "",
    sns = [],
    eve = [],
    today = new Date,
    checking = setInterval(function() {
        checkIfDone()
    }, 1500);
chrome.tabs.query({
    active: !0,
    currentWindow: !0
}, function(a) {
    (void 0 == access_token || null == access_token) && $("#overlay").css({
        display: "block"
    }), void 0 !== access_token && null !== access_token && $("#overlay").css({
        display: "none"
    });
    document.domain;
    "" == domain && void 0 == access_token == 0 && setTimeout(startInterval, 1e3), chrome.tabs.sendMessage(a[0].id, {
        getDomain: !0
    }, function(a) {
        function e() {
            $.ajax({
                url: "https://" + domain + "/api/v1/accounts/" + c.root_account + "/terms/",
                type: "GET",
                data: "per_page=100&cross_domain_login=siteadmin.instructure.com&include[]=overrides",
                beforeSend: function(a) {
                    a.setRequestHeader("Authorization", "Bearer " + access_token)
                },
                success: function(a) {
                    getTerms = a, terms = getTerms.enrollment_terms, console.log("xxxxxxxxxxxxxTERMSxxxxxxxxxxxxxxxx");
                    for (var e = 0; e < terms.length; e++) terms[e].id === c.term && (t.name = terms[e].name, t.start_at = terms[e].start_at, t.end_at = terms[e].end_at, overrides = terms[e].overrides);
                    sectionsDone !== !1 && ($("#loadingD").addClass("hideItem"), $("#retrieve").removeClass("hideItem"), $("#retrieve").fadeOut("fast"), $("#retrieve").fadeIn("slow"))
                }
            })
        }

        function n(a) {
            $.ajax({
                url: "https://" + domain + "/api/v1/courses/" + courseNum + "/enrollments",
                type: "GET",
                data: "per_page=100&cross_domain_login=siteadmin.instructure.com&type[]=TeacherEnrollment&include[]=email",
                beforeSend: function(a) {
                    a.setRequestHeader("Authorization", "Bearer " + access_token)
                },
                success: function(e) {
                    function s(a) {
                        return null !== teachers.last_activity_at ? (a = a.last_activity_at, new Date(a)) : void 0
                    }

                    function t(a, e) {
                        return s(a) > s(e) ? a : e
                    }
                    teachers = e, console.log("xxxxxxxxxxxxxENROLLMENTSxxxxxxxxxxxxxxxx"), 0 === teachers.length && (console.log("sorry! I wasn't able to find a teacher"), $("#loadingT").addClass("hideItem"), $("#peopleTab").attr("href", "https://" + domain + "/courses/" + courseNum + "/users"), setTimeout(function() {
                        $("#noTeacher").removeClass("hideItem")
                    }, 500)), teachers.length && (recentTeacher = teachers.reduce(t), teacherID = recentTeacher.user_id.toString(), l(a))
                }
            })
        }

        function l(a) {
            $.ajax({
                url: "https://" + domain + "/api/v1/courses/" + courseNum + "/users/",
                type: "GET",
                data: "per_page=100&cross_domain_login=siteadmin.instructure.com&include[]=email&user_ids[]=" + teacherID,
                beforeSend: function(a) {
                    a.setRequestHeader("Authorization", "Bearer " + access_token)
                },
                success: function(e) {
                    teacherObj = e, console.log("xxxxxxxxxxxxxTEACHERxxxxxxxxxxxxxxxx"), a(), $()
                }
            })
        }
        console.log(a), info = a, domain = info.domain, courseNum = info.course, console.log(courseNum), $.ajax({
            url: "https://" + domain + "/api/v1/courses/" + courseNum + "/",
            type: "GET",
            data: "per_page=100&cross_domain_login=siteadmin.instructure.com&include[]=sections",
            beforeSend: function(a) {
                a.setRequestHeader("Authorization", "Bearer " + access_token)
            },
            success: function(a) {
                courseObj = a, console.log("xxxxxxxxxxxxxxxxCOURSExxxxxxxxxxxxxxxx"), c.name = courseObj.name, c.start_at = courseObj.start_at, c.end_at = courseObj.end_at, c.root_account = courseObj.root_account_id, c.term = courseObj.enrollment_term_id, e(), n(function() {
                    console.log("we got the teacher"), $("#loadingT").addClass("hideItem"), $("#recentTeacherBTN").removeClass("hideItem"), $("#recentTeacherBTN").fadeOut(300), $("#recentTeacherBTN").fadeIn("slow")
                })
            },
            error: function(a, e, s) {
                404 == a.status && void 0 !== access_token && (console.log("we have 404"), $("#overlay2").css({
                    display: "block"
                })), 401 == a.status && void 0 !== access_token && (console.log("we have 401"), $("#overlay1").css({
                    display: "block"
                }))
            }
        }), $.ajax({
            url: "https://" + domain + "/api/v1/courses/" + courseNum + "/sections",
            type: "GET",
            data: "per_page=100&cross_domain_login=siteadmin.instructure.com",
            beforeSend: function(a) {
                a.setRequestHeader("Authorization", "Bearer " + access_token)
            },
            success: function(a) {
                sections = a, console.log("xxxxxxxxxxxxxSECTIONSxxxxxxxxxxxxxxxx"), sectionsDone = !0;
                for (var e = 0; e < sections.length; e++) s.push(sections[e] = {
                    name: sections[e].name,
                    start_at: sections[e].start_at,
                    end_at: sections[e].end_at,
                    sectionId: sections[e].id
                });
                setTimeout(function() {
                    clearInterval(checking)
                }, 300)
            }
        }), $("#recentTeacherBTN").on("click", function() {
            tEmail = teacherObj[0].email, $(this).css({
                display: "none"
            }), Typed["new"](".bopBop", {
                strings: ["Bop ", "Bop "],
                typeSpeed: 0
            }), setTimeout(function() {
                $(".loader").css({
                    display: "none"
                }), spitRecentTeacher()
            }, 950)
        })
    })
}), $("#retrieve").on("click", function() {
    $(this).css({
        display: "none"
    }), Typed["new"](".bopBop", {
        strings: ["Bop ", "Bop "],
        typeSpeed: 0
    }), setTimeout(function() {
        $(".loader").css({
            display: "none"
        }), spitAllinfo()
    }, 950)
}), window.addEventListener("DOMContentLoaded", function() {
    var a = document.getElementById("links");
    a.addEventListener("click", function() {
        var a = "http://" + domain + "/courses/" + courseNum + "/link_validator?cross_domain_login=siteadmin.instructure.com";
        chrome.tabs.create({
            url: a
        })
    })
});