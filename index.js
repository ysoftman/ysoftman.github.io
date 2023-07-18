// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.
// https://github.com/showdownjs/showdown/issues/615
// let converter = new showdown.Converter();
// converter.disableForced4SpacesIndentedSublists = true;

let pt = new Promise(function (success, fail) {
    success("success")
});

pt.then(function () {
    $("#navigation").load("navbar.html", function (response, status, xhr) {
        console.log("navbar.html loaded,status:", status);
    })
}).then(function () {
    let param = window.location.search.substring(1);
    let pathname = window.location.pathname;
    //console.log('param:', param);
    //console.log("pathname:", pathname)
    if (param == "programs") {
        $.get("/programs.html", function (data, status) {
            $("#main_view").html(data);
        });
    } else {
        $.get("/about_me.md", function (data, status) {
            // showdown 사용할때
            // let html = converter.makeHtml(data);
            // marked 사용할때
            let html = marked(data);
            //document.getElementById('main_view').innerHTML = html;
            $("#main_view").html(html);
            console.log("about_me loaded")
        });
    }
});

$(document).ready(function () {
    console.log("document ready");
});
