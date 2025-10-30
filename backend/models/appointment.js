import mongoose from "mongoose";
const Aschema=new mongoose.Schema({
    pid:String,
    doctorId:String,
    date:Date,
    time:String,
    specialization:String,
    status:{type:String,default:"pending"}
})

const Appointment = mongoose.model("Appointment", Aschema);
export default Appointment;