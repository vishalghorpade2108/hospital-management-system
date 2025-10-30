import mongoose from "mongoose";
const patientScheme=new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    password:String
})

const patient=mongoose.model("Patient",patientScheme)
export default patient