"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); //string을 json으로 바꿔줌

app.use( //반드시 rootrouter위에 존재해야함
(0, _expressSession["default"])({
  //session = 미들웨어
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddleware);
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app; //검색(서비스)->monogo server->시작
//cmd에다 cd C:\Program Files\MongoDB\Server\5.0\bin
//mongod
//데이터삭제
// cmd > mongo > use wetube > db.videos.remove({})
//                                 session, users
//db.users.find({})  모든user확인
//sudo service mongodb start  시작
//sudo service mongodb stop   종료
//sudo service mongodb status 상태확인

exports["default"] = _default;