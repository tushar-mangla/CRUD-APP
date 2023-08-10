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

export const studentCustom = async (req, res) => {
  const { studentId } = req.params;
  const { customFields } = req.body;

  try {
    // Update the student's customFields array with the provided data
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { customFields },
      { new: true }
    ).exec();

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student custom fields:", error);
    res.status(500).json({ error: "Server error" });
  }
};
