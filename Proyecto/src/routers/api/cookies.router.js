import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.post("/", (req, res, next) => {
  try {
    const maxAge = 10000;
    const response = { message: "Cookie vence en 10 segundos" };
    return res
      .status(200)
      .cookie("role", "user")
      .cookie("mode", "dark", { maxAge })
      .json(response);
  } catch (error) {
    next(error);
  }
});
cookiesRouter.post("/signed", (req, res, next) => {
  try {
    const maxAge = 10000;
    const response = { message: "Cookie firmada vence en 10 segundos" };
    return res
      .status(200)
      .cookie("user_id", "123456789", { maxAge, signed: true })
      .json(response);
  } catch (error) {
    next(error);
  }
});
cookiesRouter.get("/", (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { role } = req.cookies;
    return res.status(200).json({ role, cookies });
  } catch (error) {
    next(error);
  }
});
cookiesRouter.get("/signed", (req, res, next) => {
  try {
    const cookies = req.signedCookies;
    const { user_id } = req.signedCookies;
    return res.status(200).json({ user_id, cookies });
  } catch (error) {
    next(error);
  }
});
cookiesRouter.get("/clear", (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("role")
      .clearCookie("mode")
      .json({ message: "Cookie eliminada" });
  } catch (error) {
    next(error);
  }
});

export default cookiesRouter;