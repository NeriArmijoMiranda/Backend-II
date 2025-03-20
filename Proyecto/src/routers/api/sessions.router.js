import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.post("/", (req, res, next) => {
  try {
    req.session.role = "ADMIN";
    req.session.mode = "dark";
    const response = { message: "Session guardada" };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
sessionsRouter.get("/", (req, res, next) => {
  try {
    const response = {
      message: "Session leida",
      session: req.session,
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
sessionsRouter.delete("/", (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Session eliminada" });
  } catch (error) {
    next(error);
  }
});

export default sessionsRouter;