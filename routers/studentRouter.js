import { Router } from "express";
const router = Router();

import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  studentCustom,
} from "../controllers/studentController.js";

import {
  validateIdParam,
  validateStudentInput,
} from "../middleware/validationMiddleware.js";

router.route("/").get(getAllStudents).post(validateStudentInput, createStudent);

router
  .route("/:id")
  .get(validateIdParam, getStudent)
  .patch(validateStudentInput, validateStudentInput, updateStudent)
  .delete(validateIdParam, deleteStudent);

export default router;

router.put("/:studentId/custom-fields", studentCustom);
