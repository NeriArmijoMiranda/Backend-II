import { Router } from "express";

const cartsRouter = Router();

const createOne = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const readAll = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const readById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const updateById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const destroyById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

cartsRouter.post("/", createOne);
cartsRouter.get("/", readAll);
cartsRouter.get("/:uid", readById);
cartsRouter.put("/:uid", updateById);
cartsRouter.delete("/:uid", destroyById);

export default cartsRouter;