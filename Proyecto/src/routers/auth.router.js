import CustomRouter from "../utils/CustomRouter.util.js";
import passportCb from "../middlewares/passport.Cb.mid.js";

const register = async (req, res) => {
  const user = req.user;
  res.json201(user);
};
const login = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
  res.cookie("token", token, opts).json200(user, "Logged in");
};
const signout = (req, res) =>
  res.clearCookie("token").json200(null, "Signed out");
const online = (req, res) => res.json200(null, "It's online");
const google = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
  res.cookie("token", token, opts).json200(user, "Logged in with google");
};
const failure = (req, res) => {
  return res.json401();
};

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout", ["USER", "ADMIN"], signout);
    this.create("/online", ["USER", "ADMIN"], online);
    this.read("/google", ["PUBLIC"], passportCb("google"));
    this.read("/google/callback", ["PUBLIC"], passportCb("google"), google);
    this.read("/google/failure", ["PUBLIC"], failure);
  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();