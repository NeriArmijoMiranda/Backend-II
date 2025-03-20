import { fork } from "child_process"
import CustomRouter from "../utils/CustomRouter.util.js";
import argsUtil from "../utils/args.util.js";
//import sum from "../utils/sum.util.js";

const readDataOfProcess = (req, res) => {
  const { pid, argv, env } = process;
  res.json200({ pid, argv, env });
};
const readArgs = (req, res) => res.json200(argsUtil);
//const sumCallback = (req, res)=> res.json200({ result: sum()})
const sumCallback = (req, res)=> {
    const child = fork("./src/utils/sum.util.js")
    child.send("start")
    child.on("message", result=> res.json200({ result }) )
}

class ProcessRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC"], readDataOfProcess);
    this.read("/args", ["PUBLIC"], readArgs);
    //this.read("/sum", ["PUBLIC"], sumCallback)
    this.read("/sum", ["PUBLIC"], sumCallback)
  };
}

const processRouter = new ProcessRouter();
export default processRouter.getRouter();