import mongoose from "mongoose"
const doctorSchema=new mongoose.Schema({
    name:String,
    email:String,
    image:String,
    password:String,
    specialization:String,
    fees:String
})
const Dschema=mongoose.model("doctor",doctorSchema)
export default Dschema