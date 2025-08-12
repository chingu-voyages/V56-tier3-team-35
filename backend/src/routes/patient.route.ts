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
  deletePatient,
} from "../controllers/patient.controller";

const router = Router();

router.get("/", getAllPatients);
router.post("/", addNewPatient);
router.get("/:id", getPatient);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);


export default router;
