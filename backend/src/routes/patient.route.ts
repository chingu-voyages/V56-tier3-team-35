/*
 * Routes the API requests for accessing patient data
 */

import { Router } from "express";
import {
  addNewPatient,
  getAllPatients,
  updatePatient,
  getPatient,
} from "../controllers/patient.controller";

const router = Router();

router.get("/", getAllPatients);
router.post("/", addNewPatient);
router.get("/:id", getPatient);
router.patch("/:id", updatePatient);
// router.patch("/:id/status", updateStatus); // want a separate contorller for this or update status via updatepatient?

export default router;
