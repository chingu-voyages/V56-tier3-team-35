/*
 * Routes the API requests for accessing patient data
 */

import { Router } from "express";
import {
  addNewPatient,
  getAllPatients,
  updatePatient,
  getPatient,
  deltePatient,
} from "../controllers/patient.controller";

const router = Router();

router.get("/", getAllPatients);
router.post("/", addNewPatient);
router.get("/:id", getPatient);
router.patch("/:id", updatePatient);
router.delete("/:id", deltePatient);

export default router;
