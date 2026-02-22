import bcrypt from "bcryptjs";
import User from "../model/authModel.js";
import { generateToken } from "../utils/generateToken.js";
import { upsertStreamUser } from "../../lib/stream.js";


export const signUp = async(req, res) => {
const {fullName, email, password} = req.body
    try{
    if(!fullName || !email || !password){
    return res.status(400).json({success:false, error:"fill all fields"});
    }
    if(password.length < 6){
    return res.status(400).json({success:false, error:"password character should not be less than 6 characters"});
    }
    const existUser = await User.findOne({email})
    if(existUser){
    return res.status(400).json({success:false, error:"user already exist, please login"});
    }
    const idx = Math.floor(Math.random() * 100) + 1
    const randomAvater = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}
`
    const user = new User({
        fullName,
        email,
        password,
        profilePic:randomAvater
    });
    await user.save()

    try{
     await upsertStreamUser({
        id:user._id.toString(),
        name:user.fullName,
        image:user.profilePic || ""
    })
    console.log(`new user created for ${user.fullName}`)
    }
    catch(error){
     console.log("Error creating stream user", error)
    }
    generateToken(res, user._id)

    return res.status(201).json({success:true, 
        message:"user created successfully",user:{...user._doc, password:undefined}});
    }
    catch(error){
    console.log("error creating user", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body
    try{
    if(!email || !password){
    return res.status(400).json({success:false, error:"fill all fields"});
    }
    const user = await User.findOne({email})
    if(!user){
    return res.status(401).json({success:false, error:"invalid credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
     return res.status(401).json({success:false, error:"invalid credentials"});
    }
     generateToken(res, user._id)
     return res.status(201).json({success:true, 
     message:"user login successfully",user:{...user._doc, password:undefined}});
    }
    catch(error){
    console.log("error login user", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const logout = async(req, res) => {
    res.clearCookie("token")
     return res.status(200).json({success:true, message:"user logout successfully"});
}

export const onboardUser = async(req, res) => {
   try{
     const userId = req.user._id
     const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body
     if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
 return res.status(400).json({success:false, error:"missing fields are required",
    missingFields:[
        !fullName && "fullName",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage",
        !learningLanguage && "learningLanguage",
        !location && "location"
    ].filter(Boolean)
  }); 
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location, isOnboarded:true}, 
    { returnDocument: "after" })
    if(!updatedUser) return res.status(400).json("user not found")
    try{
     await upsertStreamUser({
        id:updatedUser._id.toString(),
        name:updatedUser.fullName,
        image:updatedUser.profilePic || ""
    })
    console.log(`new user updated for ${updatedUser.fullName}`)   
    }
    catch(error){
     console.log("Error creating stream user", error)
    }
    return res.status(200).json({success:true, user:updatedUser});
   }
   catch(error){
   console.log("error onboarding", error.message)
    return res.status(500).json({success:false, message:"Internal server error"});
   }
}