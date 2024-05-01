// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.
// https://github.com/showdownjs/showdown/issues/615
// let converter = new showdown.Converter();
// converter.disableForced4SpacesIndentedSublists = true;
//


// for webpack bundling
import "./images/bg_hr.png"
import "./images/blacktocat.png"
import "./images/icon_download.png"
import "./images/sentimental_programmer.png"
import "./images/sprite_download.png"
import "./about_me.md"
import "./curriculum_vitae.md"
import "./markdown_test.md"
import "./common_style.css"
import {loadProgramList} from "./programs.js"
//import '@fortawesome/fontawesome-free/js/fontawesome'
//import '@fortawesome/fontawesome-free/js/solid'
//import '@fortawesome/fontawesome-free/js/regular'
//import '@fortawesome/fontawesome-free/js/brands'
import { marked } from 'marked';
const axios = require('axios');

function sleep(ms=0) {
    return new Promise(msg => setTimeout(msg, ms));
}

function md2Html(md) {
    // showdown 사용할때
    // let html = converter.makeHtml(data.data);
    // marked 사용할때
    // 렌더링된 md 의 링크부분 새창에서 열기
    marked.setOptions({
        breaks: true,
    })
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
        return `<a target="_blank" href="${href}">${text}`+'</a>'
    }
    marked.use({renderer})
    return marked.parse(md);
}

let pt = new Promise(function (success, fail) {
    success("success")
});

pt.then(function () {
    //for test
    //await sleep(1000);
    //console.log("---");

    let param = ""
    //load 는 비동기로 동작,혹시 navbar.html 이 로딩이 선행 후 dom 을 사용하도록 함
    axios.get("/navbar.html")
        .then(function (data) {
            document.getElementById('navigation').innerHTML = data.data
            console.log("navbar.html loaded");
            param = window.location.search.substring(1);
        })
        .then(function (data) {
            if (param == "programs") {
                axios.get("/programs.html").then(function (data) {
                    document.getElementById('about_me').classList.remove("nav-active")
                    document.getElementById('curriculum_vitae').classList.remove("nav-active")
                    document.getElementById('programs').classList.add("nav-active")
                    document.getElementById('main_view').innerHTML = data.data
                    loadProgramList()
                });
            } else if (param == "curriculum_vitae") {
                axios.get("/curriculum_vitae.md").then(function (data) {
                    document.getElementById('about_me').classList.remove("nav-active")
                    document.getElementById('curriculum_vitae').classList.add("nav-active")
                    document.getElementById('programs').classList.remove("nav-active")
                    document.getElementById('main_view').innerHTML = md2Html(data.data)
                });
            } else {
                axios.get("/about_me.md").then(function (data) {
                    document.getElementById('about_me').classList.add("nav-active")
                    document.getElementById('curriculum_vitae').classList.remove("nav-active")
                    document.getElementById('programs').classList.remove("nav-active")
                    document.getElementById('main_view').innerHTML = md2Html(data.data)
                });
            }
        })
});


// deprecated in jquery 1.8 and it can't be used starting from jquery 3.0
//$(document).ready(function () {
//    console.log("document ready");
//});
// jquery
//$(function(){
//    console.log("document ready");
//})

document.addEventListener("DOMContentLoaded", function(){
    console.log("document ready");
});
