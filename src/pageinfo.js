import packageJSON from "../package.json" assert { type: "json" };
//const packageJSON = require("package.json");

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const pageinfoAddEventListener = function () {
  let html = "";
  html += "[package.json]";
  html += "<br>";
  html += JSON.stringify(packageJSON, null, 2);
  document.getElementById("html_out").innerHTML = html;
};
