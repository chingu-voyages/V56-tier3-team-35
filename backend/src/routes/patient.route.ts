/*
 * Routes the API requests for accessing patient data
 */

import { Router } from "express";
import {
  addNewPatient,
  getAllPatients,
  getStatusTransitions,
  updatePatient,
  updateStatus,
} from "../controllers/patient.controller";

const router = Router();

// route to get one patient by id?
router.get("/", getAllPatients);
router.post("/", addNewPatient);
router.put("/:id", updatePatient); // maybe change to PATCH?
router.patch("/:id/status", updateStatus);
router.get("/:id/status-transitions", getStatusTransitions);

export default router;
