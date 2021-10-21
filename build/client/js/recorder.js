"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var startBtn = document.getElementById("startBtn");
var video = document.getElementById("preview");

var handleStart = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var stream;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return navigator.mediaDevices.getUserMedia({
              audio: false,
              video: true
            });

          case 2:
            stream = _context.sent;
            video.srcObject = stream;
            video.play();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleStart() {
    return _ref.apply(this, arguments);
  };
}();

startBtn.addEventListener("click", handleStart);