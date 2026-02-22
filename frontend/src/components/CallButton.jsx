import { VideoIcon } from 'lucide-react'
import React from 'react'

const CallButton = ({handleVideoCall}) => {
  return (
    <div className=' absolute  top-3 right-3 z-50'>
        <button onClick={handleVideoCall} className='btn btn-success btn-sm text-white'>
            <VideoIcon className='size-6'/>
        </button>
    </div>
  )
}

export default CallButton
