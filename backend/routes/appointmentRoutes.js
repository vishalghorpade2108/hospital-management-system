import e from "express";
import {addAppointment, getAppointmentCountByDoctorAndDate,getAppointment,deleteAppointment,getAppointmentByDoctor} from "../controllers/AppointmentController.js"
const router=e.Router()
router.post("/add",addAppointment)
router.post("/appointmentbydate",getAppointmentCountByDoctorAndDate)
router.post("/user",getAppointment)
router.delete("/delete/:id",deleteAppointment)
router.get("/appointmentbydr",getAppointmentByDoctor)
export default router