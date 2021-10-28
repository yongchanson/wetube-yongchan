"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var textarea = form.querySelector("textarea");
var deleteBtn = document.querySelectorAll(".deleteBtn");

var addComment = function addComment(text, id) {
  var commentContainer = document.querySelector(".video__comments ul");
  var commentList = document.createElement("li");
  commentList.dataset.id = id;
  commentList.classList.add("video__comment");
  var icon = document.createElement("i");
  var span = document.createElement("span");
  var span2 = document.createElement("span");
  icon.className = "fas fa-comment";
  span.innerText = " ".concat(text);
  span2.classList.add("deleteBtn");
  span2.innerText = "❌";
  commentList.appendChild(icon);
  commentList.appendChild(span);
  commentList.appendChild(span2);
  commentContainer.prepend(commentList);
  span2.addEventListener("click", handleDelete);
};

var deleteComment = function deleteComment(event) {
  var commentContainer = document.querySelector(".video__comments ul");
  var commentList = event.target.parentNode;
  commentContainer.removeChild(commentList);
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var text, videoId, response, _yield$response$json, newCommentId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            text = textarea.value;
            videoId = videoContainer.dataset.id;

            if (!(text === "")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return (0, _nodeFetch["default"])("/api/videos/".concat(videoId, "/comment"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text: text
              })
            });

          case 7:
            response = _context.sent;

            if (!(response.status === 201)) {
              _context.next = 15;
              break;
            }

            _context.next = 11;
            return response.json();

          case 11:
            _yield$response$json = _context.sent;
            newCommentId = _yield$response$json.newCommentId;
            textarea.value = "";
            addComment(text, newCommentId);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleDelete = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var commentList, commentId, videoId, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commentList = event.target.parentNode;
            commentId = commentList.dataset.id;
            videoId = videoContainer.dataset.id;
            _context2.next = 5;
            return (0, _nodeFetch["default"])("/api/comments/".concat(commentId, "/delete"), {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                videoId: videoId
              })
            });

          case 5:
            response = _context2.sent;

            if (response.status === 201) {
              deleteComment(event);
            }

            if (response.status === 403) {
              alert("댓글 주인이 아닙니다.");
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDelete(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

form.addEventListener("submit", handleSubmit);

for (var i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDelete);
}