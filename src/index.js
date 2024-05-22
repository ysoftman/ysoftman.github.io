// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.
// https://github.com/showdownjs/showdown/issues/615
// let converter = new showdown.Converter();
// converter.disableForced4SpacesIndentedSublists = true;

// for webpack bundling
import "./images/bg_hr.png";
import "./images/blacktocat.png";
import "./images/icon_download.png";
import "./images/sentimental_programmer.png";
import "./images/sprite_download.png";
import "./about_me.md";
import "./projects.md";
import "./markdown_test.md";
import "./bootstrap.scss";
import "./fontawesome-free-6.5.2-web/scss/fontawesome.scss";
import "./fontawesome-free-6.5.2-web/scss/regular.scss";
import "./fontawesome-free-6.5.2-web/scss/brands.scss";
import "./fontawesome-free-6.5.2-web/scss/solid.scss";
import { loadProgramList } from "./programs.js";
import { restaurantAddEventListener } from "./restaurant.js";
import "./common.css"; // css, scss 중 마지막에 import 해야 올바르게 적용된다.
import { marked } from "marked";
const axios = require("axios");

function sleep(ms = 0) {
  return new Promise((msg) => setTimeout(msg, ms));
}

function md2Html(md) {
  // showdown 사용할때
  // let html = converter.makeHtml(md);
  // marked 사용할때
  // 렌더링된 md 의 링크부분 새창에서 열기
  marked.setOptions({
    breaks: true,
  });
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + "</a>";
  };
  marked.use({ renderer });
  return marked.parse(md);
}

function activeMenu(id) {
  document.getElementById("about_me").classList.remove("nav-active");
  document.getElementById("projects").classList.remove("nav-active");
  document.getElementById("programs").classList.remove("nav-active");
  document
    .getElementById("github_webhook_action")
    .classList.remove("nav-active");
  document.getElementById("watchdust").classList.remove("nav-active");
  document.getElementById("restaurant").classList.remove("nav-active");
  document.getElementById(id).classList.add("nav-active");
}

function text2html(text) {
  text = text.replace(
    /https?:\/\/([^ (\r\n|\r|\n)]+)/g,
    '<a target="_blank" href="$&">$&</a>',
  );
  text = text.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return text;
}
let pt = new Promise(function (success, fail) {
  success("success");
});

pt.then(function () {
  //for test
  //await sleep(1000);
  //console.log("---");

  let param = "";
  //load 는 비동기로 동작,혹시 navbar.html 이 로딩이 선행 후 dom 을 사용하도록 함
  axios
    .get("navbar.html")
    .then(function (response) {
      document.getElementById("navigation").innerHTML = response.data;
      console.log("navbar.html loaded");
      param = window.location.search.substring(1);
    })
    .then(function (response) {
      if (param == "programs") {
        axios.get("programs.html").then(function (response) {
          activeMenu("programs");
          document.getElementById("main_view").innerHTML = response.data;
          loadProgramList();
        });
      } else if (param == "projects") {
        axios.get("projects.md").then(function (response) {
          activeMenu("projects");
          document.getElementById("main_view").innerHTML = md2Html(
            response.data,
          );
        });
      } else if (param == "github-webhook-action") {
        // CORS 이슈로 서버 응답에 다음 헤더 추가함
        // Access-Control-Allow-Origin: *
        // Access-Control-Allow-Methods: get
        axios
          .get("https://github-webhook-action.appspot.com")
          .then(function (response) {
            activeMenu("github_webhook_action");
            document.getElementById("main_view").innerHTML =
              "<h3>" + text2html(response.data) + "</h3>";
          });
      } else if (param == "watchdust") {
        let out = "";
        // CORS 이슈로 서버 응답에 다음 헤더 추가함
        // Access-Control-Allow-Origin: *
        // Access-Control-Allow-Methods: get
        axios
          .get("https://watchdust.appspot.com")
          .then(function (response) {
            activeMenu("watchdust");
            out += "<h3>" + text2html(response.data) + "</h3>";
          })
          .then(function (response) {
            axios
              .get("https://watchdust.appspot.com/watchDust")
              .then(function (response) {
                out += "<h3>----------<br><br></h3>";
                out += "<h3>" + text2html(response.data) + "</h3>";
                document.getElementById("main_view").innerHTML = out;
              });
          });
      } else if (param == "restaurant") {
        axios.get("restaurant.html").then(function (response) {
          activeMenu("restaurant");
          document.getElementById("main_view").innerHTML = response.data;
          restaurantAddEventListener();
        });
      } else {
        axios.get("about_me.md").then(function (response) {
          activeMenu("about_me");
          document.getElementById("main_view").innerHTML = md2Html(
            response.data,
          );
        });
      }
    });
});

// deprecated in jquery 1.8 and it can't be used starting from jquery 3.0
//$(document).ready(function () {
//    console.log("document ready");
//});
// jquery
//$(function(){
//    console.log("document ready");
//})

document.addEventListener("DOMContentLoaded", function () {
  console.log("document ready");
});
