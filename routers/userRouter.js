import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  updateUser,
  updatePassword,
  aggregateStudentsByGenderAndClass,
} from "../controllers/userController.js";
import {
  validateUpdateUserInput,
  validateUpdatePasswordInput,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);
router.get("/stats", aggregateStudentsByGenderAndClass);
router.put("/update-password", validateUpdatePasswordInput, updatePassword);
export default router;
