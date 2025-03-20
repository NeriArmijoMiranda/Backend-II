import CustomRouter from "../utils/CustomRouter.util.js";
import Product from "../data/models/products.model.js";

const createProduct = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await Product.create(data);
  res.json201(response);
};
const readAllProducts = async (req, res) => {
  const response = await Product.find();
  res.json200(response);
};
const readOneProduct = async (req, res) => {
  const { pid } = req.params;
  const response = await Product.findById(pid);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};
const updateOneProduct = async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  const opt = { new: true };
  const response = await Product.findByIdAndUpdate(pid, data, opt);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};
const destroyOneProduct = async (req, res) => {
  const { pid } = req.params;
  const response = await Product.findByIdAndDelete(pid);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createProduct);
    this.read("/", ["PUBLIC"], readAllProducts);
    this.read("/:pid", ["PUBLIC"], readOneProduct);
    this.update("/:pid", ["ADMIN"], updateOneProduct);
    this.destroy("/:pid", ["ADMIN"], destroyOneProduct);
  };
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();