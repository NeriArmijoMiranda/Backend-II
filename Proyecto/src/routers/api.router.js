import { Router } from "express";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import usersRouter from "./api/users.router.js";
import authRouter from "./api/auth.router.js";
import productsRouter from "./api/products.router.js";

const apiRouter = Router();

apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/products", productsRouter);

export default apiRouter;