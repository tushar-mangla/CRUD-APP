import { Router } from "express";
const router = Router();

import {
  createCustomField,
  getCustomFieldbyId,
  getAllCustomFields,
  updateCustomFields,
  deleteCustomField,
} from "../controllers/customFieldController.js";

router.post("/", createCustomField);
router.get("/", getAllCustomFields);
router.get("/:id", getCustomFieldbyId);
router.patch("/:id", updateCustomFields);
router.delete("/:id", deleteCustomField);

export default router;
