import mongoose from "mongoose";

const MedicalSchema = new mongoose.Schema({
  aid: String,
  pid: String,
  did: String,
  bp: String,
  sugar: String,
  temperature: String,
  weight: String,
  nextvisit: String,
  prescription: String,
  disease: String,
});

const Medical = mongoose.model("medical", MedicalSchema);
export default Medical;
