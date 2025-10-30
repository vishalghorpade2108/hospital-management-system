import Admin from "../models/admin.js"
export const getAdmin =async (req,res)=>{
    try {
        const {email,password}=req.body
        const admin=await Admin.findOne({email:email})
        if(!admin){
            return res.status(404).json({
        success: false,
        message: "admin not found",
      });
        }
        
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.status( 200).json({
      success: true,
      message: "admin logged in successfully",
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}