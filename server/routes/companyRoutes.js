import express from 'express'
import upload from '../config/multer.js'
import { changeJobApplicantsStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import { protectCompany } from '../middlewares/authMiddleware.js'
const router = express.Router()

// Register a Company
router.post('/register',upload.single('image'), registerCompany)
// Company Login 
router.post('/login',loginCompany)
// get company Data
router.get('/company',protectCompany, getCompanyData)
// post a new job
router.post("/post-job", protectCompany, postJob);
// get applicant data for company
router.get("/applicants", protectCompany, getCompanyJobApplicants);
// get company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJob);
// change Applications status
router.post("/change-status", protectCompany, changeJobApplicantsStatus);
// change application visibility
router.post("/change-vesiblity", protectCompany, changeJobVisibility);

export default router