
var domDomain = document.domain;
$('#optionsLink').attr('href', 'chrome-extension://' + domDomain + '/options.html');



var access_token = localStorage.Access_token;
var c = {};
var t = {};
var s = [];
var info = {};
var domain = "";
var courseNum = "";




chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { getDomain: true }, function (response) {
        console.log(response);
        info = response;
        domain = info.domain;
        courseNum = info.course;
        console.log(courseNum);
        // gathered domain and course number
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
        setTimeout(function () {
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
                }
            });
        }, 750);




    });
});





$('#optionsBTN').on("mouseenter", function(){
    $('#settingsIcon').fadeIn();
});
$('#optionsBTN').on("mouseleave", function () {
    $('#settingsIcon').fadeOut();
});

$('#retrieve').on("click", function () {

    $(this).css({ "display": "none" });
    $('#links').css({ "display": "none" })
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

});

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
    } else {
        cstart = new Date(c.start_at);
        cend = new Date(c.end_at);
    };

    $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/settings  target="_blank"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Course</h1><i class="fa fa-graduation-cap fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + c.name + '</div><li><span class="StartEnd">Start</span> ' + cstart + '</li><li><span class="StartEnd">End</span> ' + cend + '</li></a>');

};

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
        } else {
            sstart = new Date(t.start_at);
            send = new Date(t.end_at);
        };

        $('#container').append('<a class="slide-fade show" href=https://' + domain + '/courses/' + courseNum + '/sections/' + s[i].id + ' target="_blank"><div class="panel panel-blue"><div class="panel-heading"><div class="row"><div class="col-xs-3"><h1 class="titles">Section</h1><i class="fa fa-tasks fa-2x"></i></div><div class="col-xs-9 text-right"><div class="huge">' + s[i].name + '</div><li><span class="StartEnd">Start</span> ' + sstart + '</li><li><span class="StartEnd">End</span> ' + send + '</li></a>');
    };
};


window.addEventListener('DOMContentLoaded', function () {
    // your button here
    var link = document.getElementById('links');
    // onClick's logic below:
    link.addEventListener('click', function () {
        var newURL = 'http://' + domain + '/courses/' + courseNum + '/link_validator?cross_domain_login=siteadmin.instructure.com';
        chrome.tabs.create({ url: newURL });
    });
});

