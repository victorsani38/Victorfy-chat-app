import {StreamChat} from "stream-chat";
import dotenv from "dotenv"; dotenv.config();

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("please provide api key and ")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async(userData) => {
    try{
    await streamClient.upsertUsers([userData])
    return userData
    }
    catch(error){
    console.error("Error upserting users")
    }
}

export const generateStreamToken = (userId) => {
    try{
   const userIdStr = userId.toString();
   return streamClient.createToken(userIdStr)
    }
    catch(error){
     console.log("error creating stream token", error.message)
    }
}