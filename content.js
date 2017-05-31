var c = {};
var t = {};
var s = [];
course1 = document.URL.substring(document.URL.indexOf('/courses/') + 9);
if (course1.indexOf('/') !== -1) {
    course = course1.substring(0, course1.indexOf('/'));
} else {
    course = course1;
}

function getcourseObj() {





    $.ajax({
        url: 'https://' + document.domain + '/api/v1/courses/' + course + '/',
        type: 'GET',
        data: 'per_page=100',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (response) {
            courseObj = response;
            console.log("xxxxxxxxxxxxxxxxCOURSExxxxxxxxxxxxxxxx");
            c.name = courseObj.name;
            c.start_at = courseObj.start_at;
            c.end_at = courseObj.end_at;
            c.root_account = courseObj.root_account_id;
            c.term = courseObj.enrollment_term_id;
            getSectionsObj();
            getTermObj();


        }
    });
};
function getTermObj() {
    $.ajax({
        url: 'https://lquintanilla.instructure.com/api/v1/accounts/' + c.root_account + '/terms/',
        type: 'GET',
        data: 'per_page=100',
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
        }
    });

};

function getSectionsObj() {
    $.ajax({
        url: 'https://' + document.domain + '/api/v1/courses/' + course + '/sections',
        type: 'GET',
        data: 'per_page=100',
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



};

// get user's section start and end date


// grab user id from url
user = document.URL.substring(document.URL.indexOf('/users/') + 7);
if (user.indexOf('/') !== -1) {
    userID = user.substring(0, user.indexOf('/'));
} else {
    userID = user;
};


// check which section user is enrolled
function getDatesForUser() {
    $.ajax({
        url: 'https://' + document.domain + '/api/v1/courses/' + course + '/enrollments?user_id=' + user,
        type: 'GET',
        data: 'per_page=100',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (response) {
            courseDetails = response;

        },
        complete: function () {
            sectionIDs = [];
            for (var i = 0; i < courseDetails.length; i++) {
                sectionIDs.push(courseDetails[i].course_section_id);
            }
        }
    });




    for (var i = 0; i < sectionIDs.length; i++) {

        $.ajax({
            url: 'https://' + document.domain + '/api/v1/courses/' + course + '/sections/' + sectionIDs[i],
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            },
            success: function (response) {
                section = response;
                console.log("User is enrolled in section - " + section.name);
                console.log("Starts at - " + section.start_at);
                console.log("ends at - " + section.end_at);
            }
        });

    }
};




// button listener 
var access_token = "17~gthKCxu98m2FtNQh4k9Pd5R5tatv3uwMk4fK1AEiSI3cgNyratuH6v6D6AjCP21d";
function displayAll() {
    $('#retrieve').on("click", function () {
        $(this).css({ "display": "none" });
        getcourseObj();
        Typed.new('.bopBop', {
            strings: ["Bop ", "Bop "],
            typeSpeed: 0
        }),
            setTimeout(function () {
                $('.loader').css({ "display": "none" });
                spitAllinfo();
            }, 950);
        setTimeout(function () {
            // $('div.panel').slideDown("fast");
        }, 1000);

    })
};

function spitAllinfo() {

    spitCourseInfo();
    spitSectionsInfo();
    spitTermInfo();


};

// function spitCourseInfo() {
//     $('#container').append('<a href=https://' + document.domain + '/courses/' + course + '/settings  target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-graduation-cap fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + c.name + '</div><li>Start At:' + c.start_at + '</li><li>End At: ' + c.end_at + '</li></a>');

// };

function spitCourseInfo() {
    var cstart = new Date(c.start_at);
    var cend = new Date(c.end_at);

    return '<a class="slide-fade show" href=href=https://' + document.domain + '/courses/' + course + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><i class="fa fa-graduation-cap fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + c.name + '</div><li><span class="StartEnd">Start</span> ' + cstart + '</li><li><span class="StartEnd">End</span> ' + cend + '</li></a>';

};

// function spitTermInfo() {
//     $('#container').append('<a href=https://' + document.domain + '/accounts/' + c.root_account + '/terms/ target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-university fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + t.name + '</div><li>Start At:' + t.start_at + '</li><li>End At: ' + t.end_at + '</li></a>');

// };

function spitTermInfo() {
    var tstart = "";
    var tend = "";
    if (t.start_at == null) {
        tstart = " Nada";
    }

    if (t.end_at == null) {
        tend = " Nada";
    } else {
        tstart = new Date(t.start_at);
        tend = new Date(t.end_at);
    };

    $('#container').append('<a class="slide-fade show" href=https://' + document.domain + '/accounts/' + c.root_account + '/terms target="_blank"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Term</h1><i class="fa fa-university fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + t.name + '</div><li><span class="StartEnd">Start</span> ' + tstart + '</li><li><span class="StartEnd">End</span> ' + tend + '</li></a>');

};

// function spitSectionsInfo() {
//     for (var i = 0; i < s.length; i++) {
//         $('#container').append('<a href=https://' + document.domain + '/courses/' + course + '/sections/' + s[i].id + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-tasks fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + s[i].name + '</div><li>Start At:' + s[i].start_at + '</li><li>End At: ' + s[i].end_at + '</li></a>');
//     };
// };

function spitSectionsInfo() {
    for (var i = 0; i < s.length; i++) {
        var sstart = new Date(s[i].start_at);
        var send = new Date(s[i].end_at);
        $('#container').append('<a class="slide-fade show" href=https://' + dcoument.domain + '/courses/' + course + '/sections/' + s[i].id + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><i class="fa fa-tasks fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + s[i].name + '</div><li><span class="StartEnd">Start</span> ' + sstart + '</li><li><span class="StartEnd">End</span> ' + send + '</li></a>');
    };
};



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.getDomain == true)
            sendResponse({ domain: document.domain, course: course });
    });