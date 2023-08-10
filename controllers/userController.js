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
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const isPreviousPasswordValid = await comparePassword(
      req.body.previousPassword,
      user.password
    );

    if (!isPreviousPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid previous password" });
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
      .json({ msg: "An error occurred while updating the password" });
  }
};

export const aggregateStudentsByGenderAndClass = async (req, res) => {
  try {
    const aggregatedStudents = await Student.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: {
            gender: "$gender",
            class: "$studentClass",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.class",
          counts: {
            $push: {
              gender: "$_id.gender",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          class: "$_id",
          counts: 1,
        },
      },
    ]);

    const transformedData = aggregatedStudents.map((item) => {
      const classData = { class: item.class, male: 0, female: 0 };

      item.counts.forEach((countItem) => {
        if (countItem.gender === "male") {
          classData.male = countItem.count;
        } else if (countItem.gender === "female") {
          classData.female = countItem.count;
        }
      });

      return classData;
    });

    res.status(StatusCodes.OK).json(transformedData);
  } catch (error) {
    console.error("Error during aggregation:", error);
  }
};
