/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.\n// https://github.com/showdownjs/showdown/issues/615\n// let converter = new showdown.Converter();\n// converter.disableForced4SpacesIndentedSublists = true;\n\nlet pt = new Promise(function (success, fail) {\n    success(\"success\")\n});\n\npt.then(function () {\n    $(\"#navigation\").load(\"navbar.html\", function (response, status, xhr) {\n        console.log(\"navbar.html loaded, status:\", status);\n    })\n}).then(function () {\n    let param = window.location.search.substring(1);\n    //console.log('param:', param);\n    if (param == \"programs\") {\n        $.get(\"/programs.html\", function (data, status) {\n            $(\"#main_view\").html(data);\n        });\n    } else if (param == \"curriculum_vitae\") {\n        $.get(\"/curriculum_vitae.md\", function (data, status) {\n            let html = marked(data);\n            $(\"#main_view\").html(html);\n        });\n    } else {\n        $.get(\"/about_me.md\", function (data, status) {\n            // showdown 사용할때\n            // let html = converter.makeHtml(data);\n            // marked 사용할때\n            let html = marked(data);\n            //document.getElementById('main_view').innerHTML = html;\n            $(\"#main_view\").html(html);\n            console.log(\"about_me loaded\")\n        });\n    }\n});\n\n$(document).ready(function () {\n    console.log(\"document ready\");\n});\n\n\n//# sourceURL=webpack://ysoftman.github.io/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;