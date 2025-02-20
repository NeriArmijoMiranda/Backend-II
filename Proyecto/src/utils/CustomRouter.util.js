
import { Router } from "express";
import applyPolicies from "../middlewares/applyPolicies.mid.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.use(this.setupResponses);
  }
  /* continua */
  getRouter = () => this.router;
  applyMiddlewares = (middlewares) =>
    middlewares.map((each) => async (req, res, next) => {
      try {
        await each(req, res, next);
      } catch (error) {
        next(error);
      }
    });
  setupResponses = (req, res, next) => {
    try {
      const { method, originalUrl: url } = req;
      const responses = {
        200: "Success",
        201: "Created",
        400: "Client Error",
        401: "Bad auth",
        403: "Forbidden",
        404: "Not found",
        500: "Server Error",
      };
      const successResponse = (code, response, message = responses[code]) =>
        res.status(code).json({ method, url, response, message });
      const errorResponse = (code, error = responses[code]) =>
        res.status(code).json({ method, url, error });
      res.json200 = (resp, mesg) => successResponse(200, resp, mesg);
      res.json201 = (resp, mesg) => successResponse(201, resp, mesg);
      res.json400 = (err) => errorResponse(400, err);
      res.json401 = (err) => errorResponse(401, err);
      res.json403 = (err) => errorResponse(403, err);
      res.json404 = (err) => errorResponse(404, err);
      res.json500 = (err) => errorResponse(500, err);
      next();
    } catch (error) {
      next(error);
    }
  };
  create = (path, policies, ...middlewares) =>
    this.router.post(
      path,
      applyPolicies(policies),
      this.applyMiddlewares(middlewares)
    );
  read = (path, policies, ...middlewares) =>
    this.router.get(
      path,
      applyPolicies(policies),
      this.applyMiddlewares(middlewares)
    );
  update = (path, policies, ...middlewares) =>
    this.router.put(
      path,
      applyPolicies(policies),
      this.applyMiddlewares(middlewares)
    );
  destroy = (path, policies, ...middlewares) =>
    this.router.delete(
      path,
      applyPolicies(policies),
      this.applyMiddlewares(middlewares)
    );
  use = (path, ...middlewares) =>
    this.router.use(path, this.applyMiddlewares(middlewares));
}

export default CustomRouter;
