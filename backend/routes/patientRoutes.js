import express from "express"
import {registerPatient,getPatient,getPatientName,getAllPatients} from "../controllers/patientControllers.js"
const router=express.Router()
router.post("/register",registerPatient)
router.post("/login",getPatient)
router.get("/allpatients",getAllPatients)
router.get("/getpatientname/:id ",getPatientName)
export default  router
