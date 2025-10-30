import Patient from "../models/patient.js"
export const registerPatient=async(req,res)=>{
    try {
        const data=req.body
        const {name,email,mobile,password}=data
        const newPatient=new Patient({
          name,
          email,
          mobile,
          password
        })
       await newPatient.save()
        
    res.status(201).json({
      success: true,
      message: "patient registred saved successfully",
    });
    } catch (error) {
         console.error("Error register new patient :", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
    }
}

export const getPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const patient = await Patient.findOne({ email: email });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

 
    if (patient.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    res.status( 200).json({
      success: true,
      message: "Patient logged in successfully",
      patient: {
        id:patient._id,
        name: patient.name,
        email: patient.email,
        mobile: patient.mobile,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getPatientName= async (req,res)=>{
  try {
    const id=req.params.id;
   
    const isPatient=await Patient.findById(id)
  
    if(isPatient)
      res.status(200).json(isPatient)
  } catch (error) {
res.status(500).json({
  success:false,
  message:error
})
  }
}

export const getAllPatients=async(req,res)=>{
  try {
       const patients=await Patient.find()
       if(!patients)
       {res.status(500).json({success:true,message:"patient not found"})}
       res.json({
        success:true,
        patients:patients
       })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error
    })
  }
}