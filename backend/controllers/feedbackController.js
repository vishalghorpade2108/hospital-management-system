// backend/controllers/feedbackController.js
import Feedback from "../models/feedback.js"; // your Mongoose model

// Controller function to handle feedback saving
export const addFeedback = async (req, res) => {
  try {
   
    const { name, mno, message } = req.body;

    const newFeedback = new Feedback({
      name,
      mno,
      message,
    });

    await newFeedback.save();
  
    res.status(201).json({
      success: true,
      message: "Feedback saved successfully",
    });
  } catch (error) {
    console.error("Error saving feedback:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
