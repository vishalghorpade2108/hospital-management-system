import express from "express"
import {getDoctor,getDoctorBySpecialization,getDoctorName,addDoctor,allDoctor} from "../controllers/doctorControllers.js"

const router=express.Router()
router.get("/all",allDoctor)
router.post("/adddoctor",addDoctor)
router.post("/login",getDoctor)

router.get("/getdoctorname/:id",getDoctorName)
router.get("/:specialization",getDoctorBySpecialization)

export default router