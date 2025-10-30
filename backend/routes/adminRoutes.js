import express from "express"
import {getAdmin} from "../controllers/adminController.js"
const router=new express.Router()

router.post("/login",getAdmin)
export default router