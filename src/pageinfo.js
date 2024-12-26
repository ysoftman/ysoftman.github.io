import packageJSON from "../package.json" assert { type: "json" };
//const packageJSON = require("package.json");
import { neonCursor } from "threejs-toys";

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const pageinfoAddEventListener = function () {
  let html = "<br>";
  html += "[env from vite.config.js]";
  html += "<br>";
  html += "page version: " + __PAGE_VERSION__;
  html += "<br>";
  html += "build timestamp: " + __BUILD_TIMESTAMP__;
  html += "<br>";
  html += "<br>";
  html += "[package.json]";
  html += "<br>";
  html += JSON.stringify(packageJSON, null, 2);
  let page_info_body = document.getElementById("page_info_body");
  page_info_body.innerHTML = html;

  neonCursor({
    el: document.getElementById("neon_cursor"),
    shaderPoints: 16,
    curvePoints: 80,
    curveLerp: 0.5,
    radius1: 5,
    radius2: 30,
    velocityTreshold: 10,
    sleepRadiusX: 100,
    sleepRadiusY: 100,
    sleepTimeCoefX: 0.0025,
    sleepTimeCoefY: 0.0025,
  });

  // innerHTML 사용으로 page_info_body 의 height 가 실제 렌더링 보다 크게 설정되는 문제가 있다
  page_info_body.onload = resizeCanvas();
};

function resizeCanvas() {
  if (document.getElementById("page_info_body") == null) {
    return;
  }

  let page_info_body = document
    .getElementById("page_info_body")
    .getBoundingClientRect();
  let canvas = document.querySelector("#neon_cursor canvas");
  // absolute 는 화면 맨 왼쪽,위를 기준으로 좌표 계산
  canvas.style.position = "absolute";
  canvas.style.left = page_info_body.left + "px";
  canvas.style.top = page_info_body.top + "px";
  canvas.style.width = window.innerWidth + "px"; // innerWidth 를 사용하면 navbar폭까지 고려돼서 모바일 환경에서는 횡스크롤로 화면을 벗어날 수 도 있다.
  // canvas.style.height = `${window.innerHeight}px`; // 스크롤퇼 높이 까지 계산이 안된다.
  canvas.style.height = `${page_info_body.height}px`;
  // console.log(window.innerHeight);
  // console.log(page_info_body.height);
  // console.log(document.body.scrollHeight);
  // console.log(canvas);
}
