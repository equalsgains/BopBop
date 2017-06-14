var domDomain = document.domain;
$('#optionsLink').attr('href', 'chrome-extension://' + domDomain + '/options.html');
$('#overlayOptions').attr('href', 'chrome-extension://' + domDomain + '/options.html');


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



chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

if (access_token == undefined || access_token == null) {
    $('#overlay').css({ "display": "block" });
}

if (access_token !== undefined && access_token !== null) {
    $('#overlay').css({ "display": "none" });
}
var domDomain = document.domain;


    chrome.tabs.sendMessage(tabs[0].id, { getDomain: true }, function (response) {
        console.log(response);
        info = response;
        domain = info.domain;
        courseNum = info.course;
        console.log(courseNum);
        // gathered domain and course number
        // create loading bar
        $.ajax({
            url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/',
            type: 'GET',
            data: 'per_page=100&cross_domain_login=siteadmin.instructure.com',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            },
            success: function (getCourse) {
                courseObj = getCourse;
                console.log("xxxxxxxxxxxxxxxxCOURSExxxxxxxxxxxxxxxx");
                c.name = courseObj.name;
                c.start_at = courseObj.start_at;
                c.end_at = courseObj.end_at;
                c.root_account = courseObj.root_account_id;
                c.term = courseObj.enrollment_term_id;
                getTermDates();

                getMostRecent(function () {
                    console.log("we got the teacher");
                    $('#loadingT').addClass("hideItem");
                    $('#recentTeacherBTN').removeClass('hideItem');
                    $('#recentTeacherBTN').fadeOut("fast");
                    $('#recentTeacherBTN').fadeIn("slow");

                });




            }
        });


        // get all sections
        $.ajax({
            url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/sections',
            type: 'GET',
            data: 'per_page=100&cross_domain_login=siteadmin.instructure.com',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            },
            success: function (response) {
                sections = response;
                console.log("xxxxxxxxxxxxxSECTIONSxxxxxxxxxxxxxxxx");
                for (var i = 0; i < sections.length; i++) {
                    s.push(sections[i] = {
                        name: sections[i].name,
                        start_at: sections[i].start_at,
                        end_at: sections[i].end_at,
                        id: sections[i].id
                    });
                };
            }
        });

        // get term dates
        function getTermDates() {
            $.ajax({
                url: 'https://' + domain + '/api/v1/accounts/' + c.root_account + '/terms/',
                type: 'GET',
                data: 'per_page=100&cross_domain_login=siteadmin.instructure.com',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (response) {
                    getTerms = response;
                    terms = getTerms.enrollment_terms;
                    console.log("xxxxxxxxxxxxxTERMSxxxxxxxxxxxxxxxx");
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i].id === c.term) {
                            t.name = terms[i].name;
                            t.start_at = terms[i].start_at;
                            t.end_at = terms[i].end_at;

                        }

                    };
                    console.log("we have all dates");
                    $('#loadingD').addClass("hideItem");
                    $('#retrieve').removeClass('hideItem');
                    $('#retrieve').fadeOut("fast");
                    $('#retrieve').fadeIn("slow");

                }
            });
        };

        //get most recent teacher

        function getMostRecent(onComplete) {
            $.ajax({
                url: 'https://' + domain + '/api/v1/courses/' + courseNum + '/enrollments',
                type: 'GET',
                data: 'per_page=100&cross_domain_login=siteadmin.instructure.com&type[]=TeacherEnrollment',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (response) {
                    teachers = response;
                    console.log("xxxxxxxxxxxxxENROLLMENTSxxxxxxxxxxxxxxxx");
                    function dateFromString(str) {
                        // Fix date string before conversion -- some spaces need to be removed:
                        if (teachers.last_activity_at !== null) {
                            str = str.last_activity_at;
                            return new Date(str);
                        }
                    }

                    function mostRecent(a, b) {
                        return dateFromString(a) > dateFromString(b) ? a : b;
                    };

                    recentTeacher = teachers.reduce(mostRecent);
                    teacherID = recentTeacher.user_id.toString();
                    getTeachersObj(onComplete);

                }
            });
        };


        function getTeachersObj(onComplete) {

            $.ajax({
                url: 'https://' + domain + '/api/v1/users/' + teacherID + '/profile',
                type: 'GET',
                data: 'per_page=100&cross_domain_login=siteadmin.instructure.com',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (response) {
                    teacherObj = response;
                    console.log("xxxxxxxxxxxxxTEACHERxxxxxxxxxxxxxxxx");
                    onComplete();


                }
            });
        };

        $('#recentTeacherBTN').on("click", function () {
            // hide the buttons once it's clicked




            if (teacherObj.primary_email === undefined) {
                getMostRecent();
            };

            $(this).css({ "display": "none" });
            // $('#links').css({ "display": "none" });
            Typed.new('.bopBop', {
                strings: ["Bop ", "Bop "],
                typeSpeed: 0
            }); setTimeout(function () {
                $('.loader').css({ "display": "none" });
                if (teacherObj.primary_email === undefined) {
                    setTimeout(function () {
                        spitRecentTeacher();
                    }, 600);
                };
                spitRecentTeacher();

            }, 950);



        });



    });

});




// settings button

// end of settings button

// Get all dates to display
$('#retrieve').on("click", function () {
    // hide the buttons once it's clicked
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
// end of dates display

// link validator
window.addEventListener('DOMContentLoaded', function () {
    // your button here
    var link = document.getElementById('links');
    // onClick's logic below:
    link.addEventListener('click', function () {
        var newURL = 'http://' + domain + '/courses/' + courseNum + '/link_validator?cross_domain_login=siteadmin.instructure.com';
        chrome.tabs.create({ url: newURL });
    });
});
// end of link validator


// display recent teacher



function spitAllinfo() {

    spitCourseInfo();
    spitSectionsInfo();
    spitTermInfo();

};

function spitCourseInfo() {
    var cstart = new Date(c.start_at);
    var cend = new Date(c.end_at);
    if (c.start_at == null) {
        cstart = " Nada";
    }

    if (c.end_at == null) {
        cend = " Nada";
    }

    $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><i class="fa fa-graduation-cap fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + c.name + '</div><li><span class="StartEnd">Start</span> ' + cstart + '</li><li><span class="StartEnd">End</span> ' + cend + '</li></a>');

};

function spitTermInfo() {
    var tstart = new Date(t.start_at);
    var tend = new Date(t.end_at);
    if (t.start_at == null) {
        tstart = " Nada";
    }

    if (t.end_at == null) {
        tend = " Nada";
    }

    $('#container').append('<a class="slide-fade show" href=https://' + domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><i class="fa fa-university fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + t.name + '</div><li><span class="StartEnd">Start</span> ' + tstart + '</li><li><span class="StartEnd">End</span> ' + tend + '</li></a>');

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


        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/sections/' + s[i].id + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><i class="fa fa-tasks fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + s[i].name + '</div><li><span class="StartEnd">Start</span> ' + sstart + '</li><li><span class="StartEnd">End</span> ' + send + '</li></a>');
    };
};




function spitRecentTeacher() {
    $('#container').append('<div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Teacher</h1><i class="fa fa-tasks fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + teacherObj.name + '</div><li><span class="StartEnd">Email: </span> ' + teacherObj.primary_email + '</li><a href=https://' + domain + '/users/' + teacherObj.id + '/ target=_blank><li><span class="StartEnd">Go To User\'s Page</span></li></a>');
}