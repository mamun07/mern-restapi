import jwt from "jsonwebtoken";

const Auth = async (req, res, next) => {
  try {
    const token = req.authorization.split("")[1];
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    req.json(decodeToken);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Failds!" });
  }
};

export default Auth;
