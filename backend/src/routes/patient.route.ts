/*
 * Routes the API requests for accessing patient data
 */

import { Router } from "express";
import patientController from "../controllers/patient.controller.js";

const router = Router();

// route to get one patient by id?
router.get("/", patientController.getAllPatients); //gets all the patient data
router.post("/", patientController.addNewPatient); //adds new patient
router.put("/:id", patientController.updatePatient); //adds new patient, maybe change to PATCH?
router.patch("/:id/status", patientController.updateStatus); //updates status of patient
router.get(
  "/api/patients/:id/status-transitions",
  patientController.getStatusTransitions
);

export default router;
