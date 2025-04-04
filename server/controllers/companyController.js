import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import generateToken from "../utils/generateToken.js";

//Register a new Company
export const registerCompany =async (req,res)=>{
 const { name, email, password } = req.body
 const imageFile = req.file;

//  no data exist
if (!name || !email || !password || !imageFile) {
    return res.json({
        success:false,
        message:"Missing Details"
    })
}
// Allready email exist or not
try {
    const companyExist = await Company.findOne({email})
    if (companyExist) {
        return res.json({success:false,message:"Company allready registered"})
    }
// Strong password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password,salt)
//   upload image
const imageUpload =await cloudinary.uploader.upload(imageFile.path)
const company = await Company.create({
    name,
    email,
    password:hashPassword,
    image:imageUpload.secure_url
})
res.json({
    success:true,
    company:{
        _id:company._id,
        name:company.name,
        email:company.email,
        image:company.image
    },
    token:generateToken(company._id)
})


} catch (error) {
    res.json({
        success:false,
        message:error.message
    })
}

}
// Company Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (isMatch) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get CompanyData
export const getCompanyData = async(req,res)=>{

 try {
   const company = req.company;
  res.json({
    success:true,company
  })
 } catch (error) {
   res.status(500).json({
     success: false,
     message: error.message,
   });
 }
}
// Post a new Job
export const postJob =async(req,res)=>{
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });
    await newJob.save();
    res.json({
      success:true,
      newJob
    })
  } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
  }
}
// get company job applicant
export const getCompanyJobApplicants = async(req,res)=>{

}
// get company job list
export const getCompanyPostedJob= async(req,res)=>{
 try {
  const companyId =req.company._id
  const jobs = await Job.find({companyId})
  res.json({
    success: true,
    jobsData:jobs,
  });
  // Adding Number of applicants info

 } catch (error) {
   res.status(500).json({
     success: false,
     message: error.message,
   });
 }
}
// change job Appplication status
export const changeJobApplicantsStatus = async(req,res)=>{

}
// change job visiblity 
export const changeJobVisibility = async (req, res) => {
  try {
    const {id} =req.body
    const companyId = req.company._id
    const job = await Job.findById(id)
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible

    }
    await job.save()
    res.json({
      success:true,job
    })
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }
};