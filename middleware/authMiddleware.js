// authMiddleware.js
import { verifyJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  // console.log("Received token:", token);

  if (!token) {
    console.log("Token not found in cookies");
    return res.status(401).send({ msg: "user not authenticaed" });
  }

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.log("Error during authentication:", error.message);
    throw new UnauthenticatedError("Authentication invalid");
  }
};
