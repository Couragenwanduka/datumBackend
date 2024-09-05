import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB`);
    }catch(error){
        console.error(`Error connecting to MongoDB: `);
    }
}

export default connectDb;