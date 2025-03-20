import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import sessions from "express-session";
//import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

/* server */
const server = express();
const port = 8080;
const ready = () => {
  console.log("server ready on port " + port);
  dbConnect();
};
server.listen(port, ready);

/* engine settings */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares */
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.COOKIE_KEY));
//const FileStore = sessionFileStore(sessions)
server.use(
  sessions({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUnitialized: true,
    //store: new FileStore({ ttl: 7*24*60*60, retries: 4, path: "./src/data/sessions"})
    store: new MongoStore({ ttl: 7 * 24 * 60 * 60, mongoUrl: process.env.MONGO_URL }),
  })
);

/* routers */
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);