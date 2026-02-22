import jwt from "jsonwebtoken";
import User from "../model/authModel.js";

export const protect = async(req, res, next) => {
    const token = req.cookies.token
    try{
    if(!token){ 
    return res.status(401).json({success:false, error:"unauthorized access"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
    return res.status(401).json({success:false, error:"invalid token"});
    }
    const user = await User.findById(decoded.userId).select("-password")
    if(!user){
    return res.status(404).json({success:false, message:"user not found"});
    }
    req.user = user
    next()
    }
    catch(error){
    console.log("middleware error", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}