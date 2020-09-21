// 리스트 하위 항목 들여쓰기가 개본 4공백 비활성화 기능이 동작하지 않는다.
// https://github.com/showdownjs/showdown/issues/615
// let converter = new showdown.Converter();
// converter.disableForced4SpacesIndentedSublists = true;});
let pt = new Promise(function (success, fail) {
    success("success")
});

pt.then(function () {
    $("#navigation").load("navbar.html", function (response, status, xhr) {
        console.log("navbar.html loaded,status:", status);
    })
}).then(function () {
    let param = window.location.search.substring(1);
    // console.log('param:', param);
    if (param == "programlist") {
        // $("#main_view").load("/program_list.html", function () { console.log("program_list loaded") });
        $.get("/program_list.html", function (data, status) {
            $("#main_view").html(data);
            console.log("program_list loaded")
        });
    } else {
        $.get("/about_me.md", function (data, status) {
            // showdown 사용할때
            //html = converter.makeHtml(data);
            // marked 사용할때
            html = marked(data);
            //document.getElementById('main_view').innerHTML = html;
            $("#main_view").html(html);
            console.log("about_me loaded")
        });
    }
});

$(document).ready(function () {
    console.log("document ready");
});
