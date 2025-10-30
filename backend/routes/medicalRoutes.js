import express from "express"
import { addMedical,getMedicalByPatient } from "../controllers/medicalController.js"
const router=express.Router()
router.post("/add",addMedical)
router.post("/patient",getMedicalByPatient)
export default router