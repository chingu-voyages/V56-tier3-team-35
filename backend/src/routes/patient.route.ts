/* 
* Routes the API requests for accessing patient data
*/

import { Router } from "express";
import { getAllPatients } from "../controllers/patient.controller.js";

const router = Router();

router.get("/", getAllPatients);  //gets all the patient data

export default router;