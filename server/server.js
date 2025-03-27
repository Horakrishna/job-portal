import * as Sentry from "@sentry/node";
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import './config/instrument.js';
import connectDB from "./config/mongoDb.js";
import { cerkWebhooks } from "./controllers/webhooks.js";

// Initilaise Express 
const app =express()

// Connect To database
await connectDB()

// MiddleWare
app.use(cors())
app.use(express.json())

// Routes
app.get('/',(req,res)=>res.send("Api is Working"))
// sentry 
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// webhooks routes
app.post("/webhooks", cerkWebhooks);
// PORT
const PORT =process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`) 
})