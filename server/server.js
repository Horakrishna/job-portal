import * as Sentry from "@sentry/node";
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectCloudinary from "./config/cloudinary.js";
import './config/instrument.js';
import connectDB from "./config/mongoDb.js";
import { cerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRouter.js';
import userRoutes from './routes/userRoutes.js';
import {clerkMiddleware} from "@clerk/express"
// Initilaise Express 
const app =express()

// Connect To database
await connectDB()
// Connect To Clodinary
await connectCloudinary()

// MiddleWare
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Routes
app.get('/',(req,res)=>res.send("Api is Working"))
// sentry 
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// webhooks routes
app.post("/webhooks", cerkWebhooks);
// PORT
app.use('/api/company',companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);
const PORT =process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`) 
})