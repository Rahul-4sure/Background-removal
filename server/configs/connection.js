import mongoose from "mongoose";

const connectDB = async () => {


    try {
        await mongoose.connect(`${process.env.URI}/bg-removal`)
        console.log('MongoDB Connected Successfully')
        
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }

}

export default connectDB;