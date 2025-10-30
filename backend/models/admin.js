import mongoose  from "mongoose";
const admin=new mongoose.Schema({
    email:String,
    password:String
})
const newAdmin=mongoose.model("admin",admin)
export default newAdmin