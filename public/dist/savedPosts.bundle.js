/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktellme"] = self["webpackChunktellme"] || []).push([["savedPosts"],{

/***/ "./public/javascript/modules/savePost.js":
/*!***********************************************!*\
  !*** ./public/javascript/modules/savePost.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nvar innerZone = document.querySelector('#savedIdeas');\n\nvar getSavedPosts = function getSavedPosts() {\n  var savedPosts = localStorage.getItem('savedPosts');\n\n  if (savedPosts === null) {\n    localStorage.setItem('savedPosts', '[]');\n  } else {\n    return JSON.parse(savedPosts);\n  }\n};\n\naxios__WEBPACK_IMPORTED_MODULE_0___default().get('/api/posts').then(function (response) {\n  var posts = response.data;\n  var savedPosts = JSON.parse(localStorage.getItem('savedPosts'));\n  savedPosts.forEach(function (savedPost) {\n    posts.forEach(function (post) {\n      if (post.id == savedPost) {\n        var postElement = document.createElement('div');\n        postElement.classList.add('idea');\n        postElement.innerHTML = \"\\n            <div class=\\\"content\\\">\\n              <div class=\\\"ideaBody\\\">\".concat(post.postContent, \"</div>\\n              <div class=\\\"ideaSignature\\\">\").concat(post.postSignature, \" on \").concat(post.date, \"</div>\\n            </div>\\n            <div class=\\\"actions\\\">\\n              <button id=\\\"\").concat(post.id, \"\\\" class=\\\"btn-danger\\\">Remove Idea \\uD83D\\uDDD1\\uFE0F</button>\\n            </div>\\n          \");\n        innerZone.appendChild(postElement);\n      }\n    });\n  });\n  console.log(savedPosts.length);\n\n  if (savedPosts.length === 0) {\n    var noPostMessage = document.createElement('p');\n    noPostMessage.classList.add('message');\n    noPostMessage.innerHTML = \"\\n          <div class=\\\"message__icon\\\">\\uD83C\\uDF1F\\uFE0F</div>\\n          <p class=\\\"message__title\\\">No saved ideas?</p>\\n          <p class=\\\"message__text\\\">Save some ideas to see them here</p>\\n          <a href=\\\"/\\\" class=\\\"ghost-btn\\\">Go to wall</a>\\n        \";\n    innerZone.appendChild(noPostMessage);\n  }\n});\ninnerZone.addEventListener('click', function (e) {\n  if (e.target.classList.contains('btn-danger')) {\n    var id = e.target.id;\n    var postsLS = getSavedPosts();\n\n    if (postsLS.indexOf(id) !== -1) {\n      var newPosts = postsLS.filter(function (post) {\n        return post !== id;\n      });\n      localStorage.setItem('savedPosts', JSON.stringify(newPosts));\n      e.target.parentElement.parentElement.remove();\n      console.log(newPosts === undefined);\n\n      if (newPosts == false) {\n        var noPostMessage = document.createElement('p');\n        noPostMessage.classList.add('message');\n        noPostMessage.innerHTML = \"\\n          <div class=\\\"message__icon\\\">\\uD83C\\uDF1F\\uFE0F</div>\\n          <p class=\\\"message__title\\\">No saved ideas?</p>\\n          <p class=\\\"message__text\\\">Save some ideas to see them here</p>\\n          <a href=\\\"/\\\" class=\\\"ghost-btn\\\">Go to wall</a>\\n        \";\n        innerZone.appendChild(noPostMessage);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://tellme/./public/javascript/modules/savePost.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = __webpack_require__.O(undefined, ["axios"], () => (__webpack_exec__("./public/javascript/modules/savePost.js")));
/******/ }
]);