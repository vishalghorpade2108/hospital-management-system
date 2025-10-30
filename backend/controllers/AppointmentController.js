import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js"
import Patient from "../models/patient.js"
export const addAppointment=async (req,res)=>{
    try {
        const{pid,doctorId,date,time,specialization}=req.body
        const newAppointment=new Appointment({pid,doctorId,date,time,specialization})
          const appointment=await newAppointment.save()
          if(appointment){
            res.status(201).json({success:true,message:"appointment book successfully"})
          }
        
    } catch (error) {
        res.status(404).json({success:false,message:error.message})
    }
}

export const getAppointmentCountByDoctorAndDate = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    if (!doctorId || !date) {
      return res.status(400).json({ success: false, message: "Doctor ID and date are required" });
    }

    // Convert to UTC midnight
    const targetDate = new Date(date);
    const startOfDay = new Date(Date.UTC(
      targetDate.getUTCFullYear(),
      targetDate.getUTCMonth(),
      targetDate.getUTCDate(),
      0, 0, 0, 0
    ));
    const endOfDay = new Date(Date.UTC(
      targetDate.getUTCFullYear(),
      targetDate.getUTCMonth(),
      targetDate.getUTCDate(),
      23, 59, 59, 999
    ));

   
    const count = await Appointment.countDocuments({
      doctorId: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    res.status(200).json({
      success: true,
      doctorId,
      date,
      totalAppointments: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointment count",
      error: error.message,
    });
  }
};


export const getAppointment = async (req, res) => {
  try {
    const { pid } = req.body; 
    if (!pid) return res.status(400).json({ success: false, message: "User ID is required" });

    // Find appointments for the user
    const appointments = await Appointment.find({ pid }).sort({ date: 1, time: 1 });

    // Populate doctor details
    const appointmentsWithDoctor = await Promise.all(
      appointments.map(async (appt) => {
       const doctor = await Doctor.findById(appt.doctorId); // get doctor details
        return {
          _id: appt._id,
          pid: appt.pid,
          doctorId: appt.doctorId,
          dname: doctor ? doctor.name : "Unknown",
          fees: doctor ? doctor.fees : 0,
          specialization: doctor ? doctor.specialization : "",
          date: appt.date,
          time: appt.time,
         status: appt.status,
        };
      })
    );

    res.json({ success: true, appointments: appointmentsWithDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteAppointment=async (req,res)=>{
  try {
  
  const id=req.params.id
    const result=await  Appointment.deleteOne({_id:id})
       if(result)
        res.status(201).json({success:true,message:"appointment deleted successfully"})
  } catch (error) {
  } 
}

export const getAppointmentByDoctor=async (req,res)=>{
  try {
   
    const { did } = req.query;
if (!did) return res.status(400).json({ success: false, message: "Doctor ID is required" });

try {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // start of today
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // start of tomorrow

  // Find today's appointments for this doctor
  const appointments = await Appointment.find({
    doctorId: did,
    date: { $gte: today, $lt: tomorrow }
  }).sort({ time: 1 });

  // Populate patient details
  const appointmentsWithPatient = await Promise.all(
    appointments.map(async (appt) => {
      const patient = await Patient.findById(appt.pid); // get patient details
      return {
        _id: appt._id,
        pid: appt.pid,
        pname: patient ? patient.name : "Unknown",
        date: appt.date,
        time: appt.time,
        status: appt.status,
      };
    })
  );

  res.json({ success: true, appointments: appointmentsWithPatient });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: "Server error" });
}

  } catch (error) {
     res.status(500).json({ success: false, message: error.message });
 
  }
}


