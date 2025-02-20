import User from "../data/models/users.model.js";
import { verifyToken } from "../utils/token.util.js";

const applyPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();
    const token = req?.cookies?.token;
    if (!token) return res.json401();
    const data = verifyToken(token);
    const { role, user_id } = data;
    if (!role || !user_id) return res.json401();
    const allowedRoles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    if (allowedRoles[role]) {
      const user = await User.findById(user_id);
      if (!user) return res.json401();
      req.user = user;
      return next();
    }
    return res.json403();
  } catch (error) {
    return next(error);
  }
};

export default applyPolicies;