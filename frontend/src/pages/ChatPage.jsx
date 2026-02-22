import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getStreamToken } from '../api/api'
import { useParams } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import {
  Channel,
  ChannelHeader,
  Chat, 
  MessageInput,
  MessageList,
  Thread,
  Window
} from "stream-chat-react"
import { StreamChat } from 'stream-chat'
import ChatLoader from '../components/ChatLoader'
import {toast} from 'react-hot-toast'
import CallButton from '../components/CallButton'

const ChatPage = () => {
  const {id:targetUserId} = useParams()

  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
  
  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)
  const {authUser} = useAuthContext()
  
  
   const {data:tokenData, isLoading} = useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled:!!authUser
  })

  const handleVideoCall = () => {
     if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`
      
      channel.sendMessage({
        text:`I've started a video call, join me hear: ${callUrl}`
      })
      toast.success("Video link sent successfully")
     }
  }

  useEffect(() => {
    const initChat = async() => {
    if(!tokenData?.token || !authUser) return
    try{
    console.log("initializing chat....")
    const client = StreamChat.getInstance(STREAM_API_KEY)
    await client.connectUser({
      id:authUser._id,
      name:authUser.fullName
    },tokenData.token)

    const channelId = [authUser._id, targetUserId].sort().join("-")
    const currChannel = client.channel("messaging", channelId, {
      members:[authUser._id, targetUserId]
    })

    await currChannel.watch()
    setChatClient(client)
    setChannel(currChannel)
    }
    catch(error){
   console.log("error connecting to channel", error)
   toast.error("could not connect to chat, please try againg")
    }finally{
      setLoading(false)
    }
    }
   initChat()
  },[tokenData, authUser, targetUserId])

  if(loading || isLoading || !chatClient || !channel) return <ChatLoader/>
  return (
  <div className='h-screen flex flex-col'>
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className='w-full relative'>
          <CallButton handleVideoCall={handleVideoCall} />

          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>

          <Thread />
        </div>
      </Channel>
    </Chat>
  </div>
)
  
}
export default ChatPage
