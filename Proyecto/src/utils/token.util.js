import jwt from "jsonwebtoken";

const createToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    return token;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

const decodeToken = (headers) => {
  try {
    const authHeader = headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Token is required");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    const decodeData = jwt.verify(token, process.env.JWT_KEY);
    return decodeData;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const decodeData = jwt.verify(token, process.env.JWT_KEY);
    return decodeData;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

export { createToken, decodeToken, verifyToken };