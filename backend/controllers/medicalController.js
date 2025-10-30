import Medical from "../models/medical.js";
import Appointment from "../models/appointment.js"; // 👈 import your appointment model
import Doctor from "../models/doctor.js"
export const addMedical = async (req, res) => {
  try {
    const data = req.body;

    // 1️⃣ Save medical record
    const newMedical = new Medical({
      aid: data.aid,
      pid: data.pid,
      did: data.did,
      bp: data.bp,
      sugar: data.sugar,
      temperature: data.temperature,
      weight: data.weight,
      disease: data.disease,
      nextvisit: data.nextVisit,
      prescription: data.prescription,
    });

    const savedMedical = await newMedical.save();

    // 2️⃣ After saving medical record, update appointment status
    if (savedMedical) {
      await Appointment.findOneAndUpdate(
        { _id: data.aid },
        { status: "Processed" }, // 👈 set any status you prefer
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: "Medical record added and appointment status updated successfully",
      data: savedMedical,
    });
  } catch (error) {
    console.error("Error in addMedical:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error saving medical record",
    });
  }
};


export const getMedicalByPatient = async (req, res) => {
  try {
    const { pid } = req.body;

    // Get all medical records for the patient
    const medicals = await Medical.find({ pid });

    // If no records found
    if (!medicals || medicals.length === 0) {
      return res.status(200).json({ success: true, medicals: [] });
    }

    // Populate doctor name and appointment date for each record
    const populatedMedicals = await Promise.all(
      medicals.map(async (record) => {
        const doctor = await Doctor.findOne({ _id: record.did });
        const appointment = await Appointment.findOne({ _id: record.aid });

        return {
          ...record.toObject(),
          dname: doctor ? doctor.name : "Unknown Doctor",
          date: appointment ? appointment.date : null,
        };
      })
    );

    res.status(200).json({ success: true, medicals: populatedMedicals });
  } catch (error) {
    console.error("Error fetching medical history:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};