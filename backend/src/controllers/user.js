import User from "../model/authModel.js"
import FriendRequest from "../model/friendRequest.js"

export const recommendedUsers = async(req, res) => {
 try{
  const currentUserId = req.user._id
  const currentUser = req.user

  const recommendedUsers = await User.find({
    $and:[
        {_id:{$ne:currentUserId}},
        {_id:{$nin:currentUser.friends}},
        {isOnboarded:true}
    ]
  })
  return res.status(200).json(recommendedUsers)
 }
 catch(error){
console.log("error getting recomended users", error.message)
 return res.status(500).json({success:false, message:"Internal server error"})
 }
}

export const getMyFriends = async(req, res) => {
    try{
    const user = await User.findById(req.user._id).select("friends")
    .populate("friends", "fullName profilePic nativeLanguage learningLanguage")
    return res.status(200).json(user.friends)
    }
    catch(error){
    console.log("error getting friends", error.message)
    return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const sendFriendRequest = async(req, res) => {
    try{
    const myId = req.user._id
    const {id:recepientId} = req.params

    if(myId === recepientId){
     return res.status(400).json({success:false, error:"you can't send friend request to yourself"})
    }

    const recepient = await User.findById(recepientId)
    if(!recepient){
    return res.status(404).json({success:false, error:"Recepient not found"})
    }
    if(recepientId.friends?.includes(myId)){
    return res.status(400).json({success:false, error:"you are already friends to this user"})
    }
    const existRequest = await FriendRequest.findOne({
        $or:[
            {sender:myId, recepient:recepientId},
            {sender:recepientId, recepient:myId}
        ]
    })
    if(existRequest){
     return res.status(400).json({success:false, error:"You have already sent a friend request to this recepient"})   
    }
    const friendRequest = await FriendRequest.create({
        sender:myId,
        recepient:recepientId
    })
    return res.status(200).json(friendRequest)
    }
    catch(error){
    console.log("error sending friend request", error.message)
    return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const acceptRequest = async(req, res) => {
    try{
    const {id:requestId} = req.params
    const friendRequest = await FriendRequest.findById(requestId)

    if(!friendRequest){
     return res.status(404).json({success:false, message:"Friend request not found"})
    }

    if(!friendRequest.recepient.equals(req.user._id)){
    return res.status(400).json({success:false, message:"you are not authorized to accep this request"})  
    }
    if (friendRequest.status === "accepted") {
  return res.status(400).json({
    success: false,
    message: "Friend request already accepted"
  });
}

    friendRequest.status = "accepted"
    await friendRequest.save()

    await User.findByIdAndUpdate(friendRequest.sender,{
        $addToSet:{friends:friendRequest.recepient}
    })
    await User.findByIdAndUpdate(friendRequest.recepient,{
        $addToSet:{friends:friendRequest.sender}
    })
     return res.status(200).json({success:true, message:"friend reques accepted"})
    }
    catch(error){
     console.log("error accepting request", error.message)
    return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const getFriendRequests = async(req, res) => {
    try{
    const incomingRequest = await FriendRequest.find({
        recepient:req.user._id,
        status:"pending"
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage")
    const acceptedRequest = await FriendRequest.find({
        sender:req.user._id,
        status:"accepted"
    }).populate("recepient", "fullName profilePic")
    return res.status(200).json({incomingRequest, acceptedRequest})
    }
    catch(error){
    console.log("error getting friend request", error.message)
    return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const outGoingRequest = async(req, res) => {
    try{
    const outGoingReq = await FriendRequest.find({
        sender:req.user._id,
        status:"pending"
    }).populate("recepient", "fullName profilePic nativeLanguage learningLanguage")
    return res.status(200).json(outGoingReq)
    }
    catch(error){
     console.log("error getting friend request", error.message)
    return res.status(500).json({success:false, message:"Internal server error"})
    }
}

