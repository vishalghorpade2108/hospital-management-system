import Doctor from "../models/doctor.js";

// Doctor login
export const getDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const doctor = await Doctor.findOne({ email: email });
  
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (doctor.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor login successful",
      doctor: {
        name: doctor.name,
        email: doctor.email,
        id: doctor._id,
      },
    });
  } catch (error) {
    console.error("Error in getDoctor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get doctors by specialization
export const getDoctorBySpecialization = async (req, res) => {
  try {
    const docSpecialization = req.params.specialization;

    const doctors = await Doctor.find({ specialization: docSpecialization });

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
 
export const getDoctorName=async (req,res)=>{
  try {
    const did=req.params.id
    const doctor=await Doctor.findById(did)
    if (doctor)
      res.json(doctor)
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error
    })
  }
}
export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, fees } = req.body;
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists with this email" });
    }

    const newDoctor = new Doctor({
      name,
      email,
      password,
      specialization,
      fees,
      image:"img.jpg",
    });

    await newDoctor.save();
    res.status(200).json({ message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Server error while adding doctor" });
  }
};

export const allDoctor=async (req,res)=>{
  try {
      const doctors = await Doctor.find();
   
    if (!doctors || doctors.length === 0) {
      return res.json({ success: false, message: "No doctors found" });
    }
    res.json({
      success: true,
      doctors: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}