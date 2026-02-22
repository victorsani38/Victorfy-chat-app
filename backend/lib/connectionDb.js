import mongoose from "mongoose";

export const connectionDb = async() => {
    try{
    const uri = process.env.NODE_ENV === "production"?
    process.env.MONGO_URI_ATLAS:
    process.env.MONGO_URI_LOCAL
    await mongoose.connect(uri)
    console.log("db connected")
    console.log(uri)
    }
    catch(error){
    console.log("error connecting to db", error)
    process.exit(1)
    }
}