import mongoose from "mongoose";

// Define schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mno: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
