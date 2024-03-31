// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.
// https://github.com/showdownjs/showdown/issues/615
// let converter = new showdown.Converter();
// converter.disableForced4SpacesIndentedSublists = true;

function sleep(ms=0) {
    return new Promise(msg => setTimeout(msg, ms));
}

let pt = new Promise(function (success, fail) {
    success("success")
});

pt.then(function () {
    //for test
    //await sleep(1000);
    //console.log("---");

    //load 는 비동기로 동작,혹시 navbar.html 이 로딩이 선행 후 dom 을 사용하도록 함
    $("#navigation").load("navbar.html", function (response, status, xhr) {
        console.log("navbar.html loaded, status:", status);
        let param = window.location.search.substring(1);
        //console.log('param:', param);
        if (param == "programs") {
            $.get("/programs.html", function (data, status) {
                document.getElementById('about_me').classList.remove("nav-active")
                document.getElementById('curriculum_vitae').classList.remove("nav-active")
                document.getElementById('programs').classList.add("nav-active")
                $("#main_view").html(data);
            });
        } else if (param == "curriculum_vitae") {
            $.get("/curriculum_vitae.md", function (data, status) {
                document.getElementById('about_me').classList.remove("nav-active")
                document.getElementById('curriculum_vitae').classList.add("nav-active")
                document.getElementById('programs').classList.remove("nav-active")
                let html = marked(data);
                $("#main_view").html(html);
            });
        } else {
            $.get("/about_me.md", function (data, status) {
                document.getElementById('about_me').classList.add("nav-active")
                document.getElementById('curriculum_vitae').classList.remove("nav-active")
                document.getElementById('programs').classList.remove("nav-active")
                // showdown 사용할때
                // let html = converter.makeHtml(data);
                // marked 사용할때
                // 링크를 새창에서 열기
                marked.setOptions({
                    breaks: true,
                })
                const renderer = new marked.Renderer();
                renderer.link = function (href, title, text) {
                    return `<a target="_blank" href="${href}">${text}`+'</a>'
                }
                marked.use({renderer})
                let html = marked(data);
                //document.getElementById('main_view').innerHTML = html;
                $("#main_view").html(html);
                console.log("about_me loaded")
            });
        }
    });
});


// deprecated in jquery 1.8 and it can't be used starting from jquery 3.0
//$(document).ready(function () {
//    console.log("document ready");
//});
$(function(){
    console.log("document ready");
})
