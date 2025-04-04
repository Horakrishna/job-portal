import express from 'express';
import { applyForJobs, getUserData, getUserJobApplications, updateResume } from '../controllers/userController.js';
const router = express.Router()
//get user data
router.get('/user',getUserData);
// apply for a job
router.post('/apply',applyForJobs);
// get Applied job data 
router.get('/applications',getUserJobApplications);
// update resume
router.post('/update-resume',updateResume)

export default router