/*
 * Routes the API requests for accessing patient data
 */

import { Router } from "express";
import { authToken } from "../middleware/auth.middleware";
import {
  addNewPatient,
  getAllPatients,
  updatePatient,
  getPatient,
  deltePatient,
} from "../controllers/patient.controller";

const router = Router();

router.get("/", authToken, getAllPatients);
router.post("/", authToken, addNewPatient);
router.get("/:id", authToken, getPatient);
router.patch("/:id", authToken, updatePatient);
router.delete("/:id", authToken, deltePatient);

export default router;
