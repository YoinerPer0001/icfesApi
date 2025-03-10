import "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token Error" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET_KEY,
      async (err, userData) => {
        if (err) return { code: 403, response: "Token error" };

        req.user = userData; //save data in req for authorization
        next();
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const VerifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const token = refreshToken.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET_KEY,
      async (err, userData) => {
        if (err) return res.status(403).json("invalid Token");

        req.user = userData; 
        next();
      }
    );
  } catch (error) {}
};
