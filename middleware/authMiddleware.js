// authMiddleware.js
import { verifyJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({ msg: "user not authenticaed" });
  }

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {
    console.log("Error during authentication:", error.message);
    throw new UnauthenticatedError("Authentication invalid");
  }
};
