
import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//string을 json으로 바꿔줌

app.use( //반드시 rootrouter위에 존재해야함
    session({ //session = 미들웨어
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;




//검색(서비스)->monogo server->시작
//cmd에다 cd C:\Program Files\MongoDB\Server\5.0\bin
//mongod

//데이터삭제
// cmd > mongo > use wetube > db.videos.remove({})
//                                 session, users
//
//db.users.find({})  모든user확인



//sudo service mongodb start  시작
//sudo service mongodb stop   종료
//sudo service mongodb status 상태확인
