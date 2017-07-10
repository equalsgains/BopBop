var domDomain = document.domain;
$('#optionsLink').attr('href', 'chrome-extension://' + domDomain + '/options.html');
$('#overlayOptions').attr('href', 'chrome-extension://' + domDomain + '/options.html');
$('#overlayOptions1').attr('href', 'chrome-extension://' + domDomain + '/options.html');
document.getElementById("refreshTab").onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
    location.reload();
};
document.getElementById("refreshTab1").onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
    location.reload();
};
var access_token = localStorage.Access_token;
var c = {};
var t = {};
var s = [];
var info = {};
var domain = "";
var courseNum = "";
var teachers = [];
var recentTeacher = "";
var teacherObj = {};
var teacherID = "";
var t;
var sectionsDone = false;
var tEmail = "";
var sns = [];
var eve = [];
var today = new Date();
var checking = setInterval(function () { checkIfDone() }, 1500);
var checkLinks;
function checkLinks() {
    chrome.tabs.executeScript({
        file: 'checkLinks.js'
    });
}
function checkIfDone() {
    if (sectionsDone !== false) {
        $('#loadingD').addClass("hideItem");
        $('#retrieve').removeClass('hideItem');
        $('#retrieve').fadeOut(300);
        $('#retrieve').fadeIn("slow");
    }
}
function reload() {
    t = setTimeout(function () {
        location.reload();
    }, 1000);
}
function startInterval() {
    if (domain == "" && access_token == undefined == false) {
        reload();
    } else {
        clearTimeout(t);
    }
}
chrome.storage.local.get(function (a) {
    access_token = a.Access_token;
});
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (access_token == undefined || access_token == null) {
        $('#overlay').css({ "display": "block" });
        reload();
    }
    if (access_token !== undefined && access_token !== null) {
        $('#overlay').css({ "display": "none" });
    }
    var domDomain = document.domain;
    if (domain == "" && access_token == undefined == false) {
        setTimeout(startInterval, 1000);
    }
    chrome.tabs.sendMessage(tabs[0].id, { getDomain: true }, function (response) {
        info = response;
        domain = info.domain;
        courseNum = info.course;
        $.ajax({
            url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/',
            type: 'GET',
            data: 'per_page=100&cross_domain_login=siteadmin.instructure.com&include[]=sections',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            },
            success: function (getCourse) {
                courseObj = getCourse;
                c.name = courseObj.name;
                c.start_at = courseObj.start_at;
                c.end_at = courseObj.end_at;
                c.root_account = courseObj.root_account_id;
                c.term = courseObj.enrollment_term_id;
                getTermDates();
                getMostRecent(function () {
                    $('#loadingT').addClass("hideItem");
                    $('#recentTeacherBTN').removeClass('hideItem');
                    $('#recentTeacherBTN').fadeOut(300);
                    $('#recentTeacherBTN').fadeIn("slow");
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status == 404 && access_token !== undefined) {
                    $('#overlay2').css({ "display": "block" });
                }
                if (xhr.status == 401 && access_token !== undefined) {
                    $('#overlay1').css({ "display": "block" });
                }
            }
        });
        $.ajax({
            url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/sections',
            type: 'GET',
            data: 'per_page=100&cross_domain_login=siteadmin.instructure.com',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            },
            success: function (response) {
                sections = response;
                sectionsDone = true;
                for (var i = 0; i < sections.length; i++) {
                    s.push(sections[i] = {
                        name: sections[i].name,
                        start_at: sections[i].start_at,
                        end_at: sections[i].end_at,
                        sectionId: sections[i].id
                    });
                };
                setTimeout(function () {
                    clearInterval(checking);
                }, 300);
            }
        });
        function getTermDates() {
            $.ajax({
                url: 'https://' + domain + '/api/v1/accounts/' + c.root_account + '/terms/',
                type: 'GET',
                data: 'per_page=100&cross_domain_login=siteadmin.instructure.com&include[]=overrides',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (response) {
                    getTerms = response;
                    terms = getTerms.enrollment_terms;
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i].id === c.term) {
                            t.name = terms[i].name;
                            t.start_at = terms[i].start_at;
                            t.end_at = terms[i].end_at;
                            overrides = terms[i].overrides;
                        }
                    };
                    if (sectionsDone !== false) {
                        $('#loadingD').addClass("hideItem");
                        $('#retrieve').removeClass('hideItem');
                        $('#retrieve').fadeOut("fast");
                        $('#retrieve').fadeIn("slow");
                    }
                }
            });
        };
        function getMostRecent(onComplete) {
            $.ajax({
                url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/enrollments',
                type: 'GET',
                data: 'per_page=100&cross_domain_login=siteadmin.instructure.com&type[]=TeacherEnrollment&include[]=email',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (response) {
                    teachers = response;
                    function dateFromString(str) {
                        if (teachers.last_activity_at !== null) {
                            str = str.last_activity_at;
                            return new Date(str);
                        }
                    }
                    function mostRecent(a, b) {
                        return dateFromString(a) > dateFromString(b) ? a : b;
                    };
                    if (teachers.length === 0) {
                        $('#loadingT').addClass("hideItem");
                        $('#peopleTab').attr('href', 'https://' + domain + '/courses/' + courseNum + '/users');
                        setTimeout(function () {
                            $('#noTeacher').removeClass('hideItem');
                        }, 500);
                    }
                    if (teachers.length) {
                        recentTeacher = teachers.reduce(mostRecent);
                        teacherID = recentTeacher.user_id.toString();
                        getTeachersObj(onComplete);
                    }
                }
            });
        };
        function getTeachersObj(onComplete) {
            $.ajax({
                url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/users/',
                type: 'GET',
                data: 'per_page=100&cross_domain_login=siteadmin.instructure.com&include[]=email&user_ids[]=' + teacherID,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (response) {
                    teacherObj = response;
                    onComplete();
                    $()
                }
            });
        };
        $('#recentTeacherBTN').on("click", function () {
            tEmail = teacherObj[0].email;
            $(this).css({ "display": "none" });
            Typed.new('.bopBop', {
                strings: ["Bop ", "Bop "],
                typeSpeed: 0
            }); setTimeout(function () {
                $('.loader').css({ "display": "none" });
                spitRecentTeacher();
            }, 950);
        });
    });
});
$('#retrieve').on("click", function () {
    $(this).css({ "display": "none" });
    Typed.new('.bopBop', {
        strings: ["Bop ", "Bop "],
        typeSpeed: 0
    });
    setTimeout(function () {
        $('.loader').css({ "display": "none" });
        spitAllinfo();
    }, 950);
});
window.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('links');
    link.addEventListener('click', function () {
        var newURL = 'http://' + domain + '/courses/' + courseNum + '/link_validator?cross_domain_login=siteadmin.instructure.com';
        chrome.tabs.create({ url: newURL });
    });
});
$('#linkCheck').on('click', function () {
    checkLinks();
});
function spitAllinfo() {
    spitCourseInfo();
    spitSectionsInfo();
    spitTermInfo();
    if (overrides.hasOwnProperty("StudentEnrollment") === true) {
        spitStudentTerm();
    }
    if (overrides.hasOwnProperty("TeacherEnrollment") === true) {
        spitTeacherTerm();
    }
    if (overrides.hasOwnProperty("TaEnrollment") === true) {
        spitTATerm();
    }
};
function spitCourseInfo() {
    var today = new Date();
    var cstart = new Date(c.start_at);
    var cend = new Date(c.end_at);
    if (c.start_at == null) {
        cstart = " Nada";
    }
    if (c.end_at == null) {
        cend = " Nada";
    }
    if (today < cstart && cstart !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-graduation-cap fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + c.name + '"></div><li><span class="StartEnd redText">Start</span> ' + cstart + '</li><li><span class="StartEnd">End</span> ' + cend + '</li>');
    } else if (today > cend && cend !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-graduation-cap fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + c.name + '"></div><li><span class="StartEnd">Start</span> ' + cstart + '</li><li><span class="StartEnd redText">End</span> ' + cend + '</li>');
    } else {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><p>Looks Good! 🙌 </p><i class="fa fa-graduation-cap fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + c.name + '"></div><li><span class="StartEnd">Start</span> ' + cstart + '</li><li><span class="StartEnd">End</span> ' + cend + '</li>');
    }
};
function spitTermInfo() {
    var today = new Date();
    var tstart = new Date(t.start_at);
    var tend = new Date(t.end_at);
    if (t.start_at == null) {
        tstart = " Nada";
    }
    if (t.end_at == null) {
        tend = " Nada";
    }
    if (today < tstart && tstart !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + t.name + '"></div><li><span class="StartEnd">Start</span> ' + tstart + '</li><li><span class="StartEnd">End</span> ' + tend + '</li>');
    } else if (today > tend && tend !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + t.name + '"></div><li><span class="StartEnd">Start</span> ' + tstart + '</li><li><span class="StartEnd redText">End</span> ' + tend + '</li>');
    } else {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + t.name + '"></div><li><span class="StartEnd">Start</span> ' + tstart + '</li><li><span class="StartEnd">End</span> ' + tend + '</li>');
    }
};
function spitSectionsInfo() {
    for (var i = 0; i < s.length; i++) {
        var sstart = new Date(s[i].start_at);
        var send = new Date(s[i].end_at);
        if (s[i].start_at == null) {
            sstart = " Nada";
        }
        if (s[i].end_at == null) {
            send = " Nada";
        }
        if (today < sstart && sstart !== " Nada") {
            $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/sections/' + s[i].sectionId + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><li><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + s[i].name + '"></li><li><span class="StartEnd redText">Start</span> ' + sstart + '</li><li><span class="StartEnd">End</span> ' + send + '</li></div>');
        } else if (today > send && send !== " Nada") {
            $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/sections/' + s[i].sectionId + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><li><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + s[i].name + '"></li><li><span class="StartEnd">Start</span> ' + sstart + '</li><li><span class="StartEnd redText">End</span> ' + send + '</li></div>');
        } else {
            $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/sections/' + s[i].sectionId + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><p>Looks Good! 🙌 </p><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge"><li><input disabled="true" class="dNames"  tabindex="1" autocomplete="off" type="text" value="' + s[i].name + '"></li><li><span class="StartEnd">Start</span> ' + sstart + '</li><li><span class="StartEnd">End</span> ' + send + '</li></div>');
        }
    };
};
function spitRecentTeacher() {
    $('#container').append('<a href=https://' + domain + '/users/' + teacherObj[0].id + '/ target=_blank><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Teacher</h1><i class="fa fa-tasks fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">' + teacherObj[0].name + '</div><li><input id="copy-text" tabindex="1" autocomplete="off" type="text" value=' + tEmail + '></li><li><input id="copy" value="copy" type="submit"></li>');
    $('#copy').on('click', function () {
        $("#copy-text").select();
        document.execCommand('copy');
    });
}
function spitStudentTerm() {
    var tstartS = new Date(overrides.StudentEnrollment.start_at);
    var tendS = new Date(overrides.StudentEnrollment.end_at);
    if (overrides.StudentEnrollment.start_at == null) {
        tstartS = " Nada";
    }
    if (overrides.StudentEnrollment.end_at == null) {
        tendS = " Nada";
    }
    if (today < tstartS && tstartS !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Students can access from:</div><li><span class="StartEnd redText">Start</span> ' + tstartS + '</li><li><span class="StartEnd">End</span> ' + tendS + '</li>');
    } else if (today > tendS && tendS !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Students can access from:</div><li><span class="StartEnd">Start</span> ' + tstartS + '</li><li><span class="StartEnd redText">End</span> ' + tendS + '</li>');
    } else {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Students can access from:</div><li><span class="StartEnd">Start</span> ' + tstartS + '</li><li><span class="StartEnd">End</span> ' + tendS + '</li>');
    }
};
function spitTeacherTerm() {
    var tstartT = new Date(overrides.TeacherEnrollment.start_at);
    var tendT = new Date(overrides.TeacherEnrollment.end_at);
    if (overrides.TeacherEnrollment.start_at == null) {
        tstartT = " Nada";
    }
    if (overrides.TeacherEnrollment.end_at == null) {
        tendT = " Nada";
    }
    if (today < tstartT && tstartT !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd redText">Start</span> ' + tstartT + '</li><li><span class="StartEnd">End</span> ' + tendT + '</li>');
    } else if (today > tendT && tendT !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd">Start</span> ' + tstartT + '</li><li><span class="StartEnd redText">End</span> ' + tendT + '</li>');
    } else {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd">Start</span> ' + tstartT + '</li><li><span class="StartEnd">End</span> ' + tendT + '</li>');
    }
};
function spitTATerm() {
    var tstartTA = new Date(overrides.TaEnrollment.start_at);
    var tendTA = new Date(overrides.TaEnrollment.end_at);
    if (overrides.TaEnrollment.start_at == null) {
        tstartTA = " Nada";
    }
    if (overrides.TaEnrollment.end_at == null) {
        tendTA = " Nada";
    }
    if (today < tstartTA && tstartTA !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Has Not Started 😒 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">Teachers can access from:</div><li><span class="StartEnd redText">Start</span> ' + tstartTA + '</li><li><span class="StartEnd">End</span> ' + tendTA + '</li>');
    } else if (today > tendTA && tendTA !== " Nada") {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p class="redText">Already Ended 😘 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">TAs can access from:</div><li><span class="StartEnd">Start</span> ' + tstartTA + '</li><li><span class="StartEnd redText">End</span> ' + tendTA + '</li>');
    } else {
        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><p>Looks Good! 🙌 </p><i class="fa fa-university fa-2x"></i></a></div><div class="col-xs-9 text-right"><div class="huge">TAs can access from:</div><li><span class="StartEnd">Start</span> ' + tstartTA + '</li><li><span class="StartEnd">End</span> ' + tendTA + '</li>');
    }
};

