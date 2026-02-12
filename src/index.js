// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.
// https://github.com/showdownjs/showdown/issues/615
// let converter = new showdown.Converter();
// converter.disableForced4SpacesIndentedSublists = true;

import "./images/bg_hr.png";
import "./images/blacktocat.png";
import "./images/icon_download.png";
import "./images/sentimental_programmer.png";
import "./images/sprite_download.png";
import "./about_me.md";
import "./projects.md";
import "./markdown_test.md";
import "./hack-v3.003-webfonts/hack.css";
// import "./hack-v3.003-webfonts/hack-subset.css"; // hack-subset(경량버전)
import { pageinfoAddEventListener } from "./pageinfo.js";
import { loadProgramList } from "./programs.js";
import { restaurantAddEventListener } from "./restaurant.js";
import "./common.css";
//const axios = require("axios"); // commonJS node 표준인데 import 방식으로 점차 변경중
import axios from "axios"; // ES module  방식
import { marked } from "marked";

// function sleep(ms = 0) {
//   return new Promise((msg) => setTimeout(msg, ms));
// }

function activeMenu(id) {
  document
    .querySelectorAll(".nav-active")
    .forEach((el) => { el.classList.remove("nav-active"); });
  document.getElementById(id).classList.add("nav-active");
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
  // not-prose 로 prose 클래스를 적용하지 않는 영역 설정
  renderer.link = (tokens) =>
    `<span class="not-prose"><a target="_blank" rel="noopener noreferrer" href="${tokens.href}">${tokens.text}</a></span>`;
  marked.use({ renderer });
  // tailwind 사용으로 기본 스타일 모두제거된다. "@tailwindcss/typography" 플러그인으로 렌더링된 md -> html 을 prose 클래스로 이쁘게 보여준다.
  return `<article class="prose dark:prose-invert max-w-none">${marked.parse(md)}</article>`;
}

function text2html(text) {
  //json(object) 은 replace 함수가 없다.
  if (typeof text === "object") {
    return JSON.stringify(text);
  }
  text = text.replace(
    /https?:\/\/([^ (\r\n|\r|\n)]+[a-z0-9])/g,
    '<a target="_blank" rel="noopener noreferrer" href="$&">$&</a>',
  );
  text = text.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return text;
}

function Atag2Imgtag(html) {
  html = html.replace(/<br>/g, "\n");
  html = html.replace(
    /("http.*.png")/g,
    "__img_start__<img src=$& />__img_end__",
  );
  html = html.replace(/.*__img_start__/g, "");
  html = html.replace(/__img_end__.*/g, "");
  html = html.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return html;
}

function showError(err) {
  console.error(err);
  document.getElementById("main_view").innerHTML =
    `<h3 class="text-red-400">페이지를 불러오는 중 오류가 발생했습니다: ${err.message}</h3>`;
}

function loadPage(path) {
  // pathname에서 선행 슬래시 제거
  const page = path.replace(/^\//, "");

  if (page === "programs") {
    axios
      .get("/partials/programs.html")
      .then((response) => {
        activeMenu("programs");
        document.getElementById("main_view").innerHTML = response.data;
        loadProgramList();
      })
      .catch(showError);
  } else if (page === "projects") {
    axios
      .get("projects.md")
      .then((response) => {
        activeMenu("projects");
        document.getElementById("main_view").innerHTML = md2Html(response.data);
      })
      .catch(showError);
  } else if (page === "github-webhook-action") {
    activeMenu("github_webhook_action");
    document.getElementById("main_view").innerHTML = `
<h3>비용 발생으로 app engine 삭제(2025.04.02)
<br>
<a target="_blank" rel="noopener noreferrer" href="https://github.com/ysoftman/github_webhook_action">https://github.com/ysoftman/github_webhook_action</a>
</h3>
`;
  } else if (page === "watchdust") {
    // CORS 이슈로 서버 응답에 다음 헤더 추가함
    // Access-Control-Allow-Origin: *
    // Access-Control-Allow-Methods: get
    Promise.all([
      axios.get("https://watchdust.appspot.com"),
      axios.get("https://watchdust.appspot.com/watchDust"),
    ])
      .then(([res1, res2]) => {
        activeMenu("watchdust");
        let out = `<h3>${text2html(res1.data)}</h3>`;
        out += "<h3>----- /watchDust -----</h3>";
        out += "<br>";
        out += `<h3>${Atag2Imgtag(text2html(res2.data))}</h3>`;
        document.getElementById("main_view").innerHTML = out;
      })
      .catch(showError);
  } else if (page === "restaurant") {
    axios
      .get("/partials/restaurant.html")
      .then((response) => {
        activeMenu("restaurant");
        document.getElementById("main_view").innerHTML = response.data;
        restaurantAddEventListener();
      })
      .catch(showError);
  } else if (page === "pageinfo") {
    axios
      .get("/partials/pageinfo.html")
      .then((response) => {
        activeMenu("pageinfo");
        document.getElementById("main_view").innerHTML = response.data;
        pageinfoAddEventListener();
      })
      .catch(showError);
  } else {
    axios
      .get("about_me.md")
      .then((response) => {
        activeMenu("about_me");
        document.getElementById("main_view").innerHTML = md2Html(response.data);
      })
      .catch(showError);
  }
}

function setupRouteLinks() {
  document.querySelectorAll("a[data-route]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const path = link.getAttribute("href");
      history.pushState(null, "", path);
      loadPage(path);
    });
  });
}

//load 는 비동기로 동작,혹시 navbar.html 이 로딩이 선행 후 dom 을 사용하도록 함
axios
  .get("/partials/navbar.html")
  .then((response) => {
    document.getElementById("navigation").innerHTML = response.data;
    setupRouteLinks();
    loadPage(window.location.pathname);
  })
  .catch(showError);

// 브라우저 뒤로가기/앞으로가기 지원
window.addEventListener("popstate", () => {
  loadPage(window.location.pathname);
});

// deprecated in jquery 1.8 and it can't be used starting from jquery 3.0
//$(document).ready(function () {
//    console.log("document ready");
//});
// jquery
//$(function(){
//    console.log("document ready");
//})

