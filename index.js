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

eval("// showdownjs 은 리스트 하위 항목 들여쓰기 기능이 동작하지 않는다.\n// https://github.com/showdownjs/showdown/issues/615\n// let converter = new showdown.Converter();\n// converter.disableForced4SpacesIndentedSublists = true;\n\nfunction sleep(ms=0) {\n    return new Promise(msg => setTimeout(msg, ms));\n}\n\nlet pt = new Promise(function (success, fail) {\n    success(\"success\")\n});\n\npt.then(function () {\n    //for test\n    //await sleep(1000);\n    //console.log(\"---\");\n\n    //load 는 비동기로 동작,혹시 navbar.html 이 로딩이 선행 후 dom 을 사용하도록 함\n    $(\"#navigation\").load(\"navbar.html\", function (response, status, xhr) {\n        console.log(\"navbar.html loaded, status:\", status);\n        let param = window.location.search.substring(1);\n        //console.log('param:', param);\n        if (param == \"programs\") {\n            $.get(\"/programs.html\", function (data, status) {\n                document.getElementById('about_me').classList.remove(\"nav-active\")\n                document.getElementById('curriculum_vitae').classList.remove(\"nav-active\")\n                document.getElementById('programs').classList.add(\"nav-active\")\n                $(\"#main_view\").html(data);\n            });\n        } else if (param == \"curriculum_vitae\") {\n            $.get(\"/curriculum_vitae.md\", function (data, status) {\n                document.getElementById('about_me').classList.remove(\"nav-active\")\n                document.getElementById('curriculum_vitae').classList.add(\"nav-active\")\n                document.getElementById('programs').classList.remove(\"nav-active\")\n                let html = marked(data);\n                $(\"#main_view\").html(html);\n            });\n        } else {\n            $.get(\"/about_me.md\", function (data, status) {\n                document.getElementById('about_me').classList.add(\"nav-active\")\n                document.getElementById('curriculum_vitae').classList.remove(\"nav-active\")\n                document.getElementById('programs').classList.remove(\"nav-active\")\n                // showdown 사용할때\n                // let html = converter.makeHtml(data);\n                // marked 사용할때\n                // 링크를 새창에서 열기\n                marked.setOptions({\n                    breaks: true,\n                })\n                const renderer = new marked.Renderer();\n                renderer.link = function (href, title, text) {\n                    return `<a target=\"_blank\" href=\"${href}\">${text}`+'</a>'\n                }\n                marked.use({renderer})\n                let html = marked(data);\n                //document.getElementById('main_view').innerHTML = html;\n                $(\"#main_view\").html(html);\n                console.log(\"about_me loaded\")\n            });\n        }\n    });\n});\n\n\n// deprecated in jquery 1.8 and it can't be used starting from jquery 3.0\n//$(document).ready(function () {\n//    console.log(\"document ready\");\n//});\n$(function(){\n    console.log(\"document ready\");\n})\n\nmermaidAPI.initialize({\n    securityLevel: 'loose'\n});\n\n\n//# sourceURL=webpack://ysoftman.github.io/./index.js?");

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