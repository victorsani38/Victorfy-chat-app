import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import {  useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../api/api'

import{
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks
} from "@stream-io/video-react-sdk"

import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from 'react-hot-toast'
import PageLoader from '../components/PageLoader'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {
  const {id:callId} = useParams()

  const [client, setClient] = useState(null)
  const [call, setCall] = useState(null)
  const [isConnecting, setIsConnecting] = useState(true)

  const {authUser} = useAuthContext()
  

  const {data:tokenData, isLoading} = useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled: !! authUser
  })

 useEffect(()=>{
  const initCall = async() => {
    if(!tokenData.token || !callId || !authUser) return
    try{
    console.log("initializing call...")
    const user = {
      id:authUser._id,
      name:authUser.fullName,
      image:authUser.profilePic
    }

    const videoClient = new  StreamVideoClient({
      apiKey:STREAM_API_KEY,
      user,
      token:tokenData.token
    })
    const callInstance= videoClient.call("default", callId)
    await callInstance.join({create:true})

    console.log("joined call successfully")
    setClient(videoClient)
    setCall(callInstance)
    }
    catch(error){
    console.log("error creating video call", error)
    toast.error("could not connect to video call, please try again")
    }finally{
      setIsConnecting(false)
    }
  } 
 initCall()
 },[tokenData, authUser, callId])

 if(isConnecting || isLoading) return <PageLoader/>
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='relative'>
        {call && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent/>
            </StreamCall>
          </StreamVideo>
        ):(
          <div className='flex items-center justify-center h-full'>
            <p>Could not initialize call, please refresh or try again later</p>
          </div>
        )}
      </div>
    </div>
  )
}

const CallContent = () => {
  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState()
  const navigate = useNavigate()

  if(callingState === CallingState.LEFT) return navigate("/")

  return(
   <StreamTheme>
    <SpeakerLayout/>
    <CallControls/>
   </StreamTheme>

  )
}

export default CallPage
