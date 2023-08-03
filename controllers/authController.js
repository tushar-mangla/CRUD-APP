import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const { email, mobilePhone, password } = req.body;
  try {
    let user;

    if (email) {
      user = await User.findOne({ email: email });
    } else user = await User.findOne({ phone: mobilePhone });

    if (!user) {
      throw new UnauthenticatedError("User not found");
    }

    const isValidUser = await comparePassword(password, user.password);
    if (!isValidUser) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = createJWT({ userId: user._id });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.OK).json({ msg: "Login successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logout" });
};
