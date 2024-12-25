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
  document.getElementById("page_info_body").innerHTML = html;

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

  // neon cursor canvas 크기 조절
  const nav_height = document.querySelector("#navigation").offsetHeight;
  const title_height = document.querySelector("#main_view h1").offsetHeight;
  const canvas = document.querySelector("#neon_cursor canvas");
  function resizeCanvas() {
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + nav_height + title_height + "px";
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};
