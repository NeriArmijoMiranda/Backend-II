import "./src/utils/env.util.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
//import fileStore from "session-file-store";
import MongoStore from "connect-mongo";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";

/* server */
const server = express();
const port = argsUtil.p;
const ready = async () => {
  console.log("server is ready on port " + port);
  await dbConnect();
  console.log("mongo connected");
};
server.listen(port, ready);

/* middlewares */
//const FileStore = fileStore(session);
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(cookieParser(process.env.COOKIE_KEY));
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 7 * 1000 },
    /*     store: new FileStore({
      path: "./src/data/sessions",
      ttl: 60 * 60 * 24 * 7,
    }), */
    store: new MongoStore({
      mongoUrl: process.env.LINK_MONGO,
      ttl: 60 * 60 * 24 * 7,
    }),
  })
);
server.use("/api/", router);
server.use(errorHandler);
server.use(pathHandler);