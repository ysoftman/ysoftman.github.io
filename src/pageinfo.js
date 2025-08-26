import packageJSON from "../package.json" assert { type: "json" };
//const packageJSON = require("package.json");
import { neonCursor } from "threejs-toys";

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const pageinfoAddEventListener = function () {
  let html = "<br>";
  html += "[env from vite.config.js]";
  html += "<br>";
  html += "last version(tag): " + __LAST_VERSION_TAG__;
  html += "<br>";
  html += "last commit hash: " + __LAST_COMMIT_HASH__;
  html += "<br>";
  html += "last commit date: " + __LAST_COMMIT_DATE__;
  html += "<br>";
  html += "last commit message: " + __LAST_COMMIT_MESSAGE__;
  html += "<br>";
  html += "build date: " + __BUILD_DATE__;
  html += "<br>";
  html += "<br>";
  html += "[package.json]";
  html += "<br>";
  html += JSON.stringify(packageJSON, null, 2);
  let page_info_body = document.getElementById("page_info_body");
  page_info_body.innerHTML = html;

  neonCursor({
    el: document.getElementById("main_view"),
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
};
