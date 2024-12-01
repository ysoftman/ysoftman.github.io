import packageJSON from "../package.json" assert { type: "json" };
//const packageJSON = require("package.json");

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const pageinfoAddEventListener = function () {
  let html = "<br>";
  html += "[env from vite.config.js (vite 로 빌드시)]";
  html += "<br>";
  html += "page version: " + __PAGE_VERSION__;
  html += "<br>";
  html += "build timestamp: " + __BUILD_TIMESTAMP__;
  html += "<br>";
  html += "<br>";
  html += "[package.json]";
  html += "<br>";
  html += JSON.stringify(packageJSON, null, 2);
  document.getElementById("html_out").innerHTML = html;
};
