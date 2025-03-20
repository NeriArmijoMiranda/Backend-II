import CustomRouter from "../utils/CustomRouter.util.js";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./auth.router.js";
import processRouter from "./process.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.router.use("/products", productsRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/cookies", cookiesRouter);
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/auth", authRouter);
    this.router.use("/process", processRouter)
  };
}

const router = new ApiRouter();
export default router.getRouter();