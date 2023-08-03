import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Student from "../models/StudentModel.js";
import mongoose from "mongoose";

import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  newUser.avatar = req.file.path;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    const isPreviousPasswordValid = await comparePassword(
      req.body.previousPassword,
      user.password
    );

    if (!isPreviousPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid previous password" });
    }

    const hashedPassword = await hashPassword(req.body.newPassword);
    user.password = hashedPassword;
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while updating the password" });
  }
};
