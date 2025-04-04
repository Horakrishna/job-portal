import Job from "../models/Job.js"
import JobApplication from "../models/jobApplications.js"
import User from "../models/User.js"

// Get user data
export const getUserData = async (req,res)=>{
 const userId = req.auth.userId
  try {
    const user  = await User.findById(userId)
    if (!user) {
        return res.json({
            success:false,
            message:"User Not found"
        })
    }
    res.json({
        success:true,user
    })
    
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }
}
// Apply for a job
export const applyForJobs = async(req,res)=>{
 const {jobId} = req.body
 const userId = req.auth.userId
 try {
    const isAllreadyApplied = await JobApplication.findOne({jobId,userId})
    if (isAllreadyApplied.lerngth > 0) {
        return res.json({
            success:false,
            message:"You have allready applied this job"
        })
    }
    const jobData = await Job.findById(jobId)

    if (!jobData) {
        return res.json({
           success:false,
           message:"Job Not found" 
        })
    }
    await JobApplication.create({
        companyId:jobData.companyId,
        userId,
        jobId,
        date:Date.now(),
    })
    // return response
    res.json({
        success:true,
        message:"Job applied successfully"
    })
 } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
 } 
}
// get user job Applications
export const getUserJobApplications =async(req,res)=>{
   
    try {
        
    } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}
// update user profule
export const updateResume = async(req,res)=>{

}