import mongoose from "mongoose";

// Function to connect Mongodb 
const connectDB = async()=>{
    mongoose.connection.on('connected',()=>console.log('Database Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/jobportal`);
}
export default connectDB