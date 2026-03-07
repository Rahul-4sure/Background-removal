import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected',()=>{
        console.log('MongoDB Connected Successfully')
    })
    
    await mongoose.connect(`${process.env.URI}/bg-removal`)

}

export default connectDB;