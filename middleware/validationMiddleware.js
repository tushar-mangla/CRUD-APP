import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import validator from "validator";
import PasswordValidator from "password-validator";
import { validateDate } from "../utils/validateDate.js";
import User from "../models/UserModel.js";
import Student from "../models/StudentModel.js";
import {
  STUDENT_CLASS,
  STUDENT_GENDER,
  STUDENT_LOCATION,
  STUDENT_SECTION,
} from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no student")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateStudentInput = withValidationErrors([
  body("studentId").notEmpty().withMessage("Student ID is required"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  validateDate("dob"),
  body("studentClass").notEmpty().withMessage("Student class is required"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender value"),
  body("parentsName").notEmpty().withMessage("Parents' name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  // validateDate("joiningInfo.interviewDate"),
  // body("joiningInfo.guardianName")
  //   .optional()
  //   .notEmpty()
  //   .withMessage("Guardian name is required"),
  // body("joiningInfo.relationWithGuardian")
  //   .optional()
  //   .notEmpty()
  //   .withMessage("Relation with guardian is required"),
  // body("joiningInfo.interviewer")
  //   .optional()
  //   .notEmpty()
  //   .withMessage("Interviewer is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const student = await Student.findById(value);
    if (!student) throw new NotFoundError(`no student with id : ${value}`);
    const isOwner = req.user.userId === student.createdBy.toString();
    if (!isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

// export const validateRegisterInput = withValidationErrors([
//   body("name").notEmpty().withMessage("name is required"),
//   body("email")
//     .notEmpty()
//     .withMessage("email is required")
//     .isEmail()
//     .withMessage("invalid email format")
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (user) throw new BadRequestError("email already exist");
//     }),
//   body("mobilePhone")
//     .notEmpty()
//     .withMessage("mobilePhone no. is required")
//     .isMobilePhone()
//     .withMessage("invalid mobilePhone format")
//     .custom(async (mobilePhone) => {
//       const user = await User.findOne({ mobilePhone });
//       if (user) throw new BadRequestError("mobilePhone already exist");
//     }),
//   body("password")
//     .notEmpty()
//     .withMessage("password is required")
//     .isStrongPassword({
//       minLength: 8,
//       minLowercase: 1,
//       minUppercase: 1,
//       minNumbers: 1,
//       minSymbols: 1,
//     })
//     .withMessage(
//       "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long"
//     ),
// ]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password does not match new password");
      }
      return true;
    }),
]);

const isEmailOrMobilePhone = (value) => {
  return (
    validator.isEmail(value) ||
    validator.isMobilePhone(value, "any", { strictMode: false })
  );
};

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email or phone is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
]);

export const validateUpdatePasswordInput = withValidationErrors([
  body("previousPassword")
    .notEmpty()
    .withMessage("Previous password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Confirm password does not match new password");
      }
      return true;
    }),
]);
