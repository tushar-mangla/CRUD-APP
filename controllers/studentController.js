import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Student from "../models/StudentModel.js";

export const createStudent = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};

export const getAllStudents = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      { studentClass: { $regex: search, $options: "i" } },
      { dob: { $regex: search, $options: "i" } },
      { parentsName: { $regex: search, $options: "i" } },
      { studentId: { $regex: search, $options: "i" } },
    ];
  }

  const projection = {
    studentId: 1,
    lastName: 1,
    firstName: 1,
    address: 1,
    studentClass: 1,
    parentsName: 1,
    dob: 1,
  };

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const students = await Student.find(queryObject, projection)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalStudents = await Student.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalStudents / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalStudents, numOfPages, currentPage: page, students });
};

export const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.status(StatusCodes.OK).json({ student });
};

export const updateStudent = async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ student: updatedStudent });
};

export const deleteStudent = async (req, res) => {
  const removedStudent = await Student.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ Student: removedStudent });
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
        $project: {
          _id: 0,
          gender: "$_id.gender",
          class: "$_id.class",
          count: 1,
        },
      },
      {
        $group: {
          _id: "$class",
          maleCount: {
            $sum: {
              $cond: [{ $eq: ["$gender", "male"] }, "$count", 0],
            },
          },
          femaleCount: {
            $sum: {
              $cond: [{ $eq: ["$gender", "female"] }, "$count", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          class: "$_id",
          maleCount: { $ifNull: ["$maleCount", 0] },
          femaleCount: { $ifNull: ["$femaleCount", 0] },
        },
      },
    ]);
    res.status(StatusCodes.OK).json(aggregatedStudents);
  } catch (error) {
    console.error("Error during aggregation:", error);
  }
};
