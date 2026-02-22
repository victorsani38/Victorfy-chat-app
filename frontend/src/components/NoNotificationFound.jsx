
import { BellIcon } from 'lucide-react'
import React from 'react'

const NoNotificationFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='size-16 bg-base-300 flex items-center justify-center rounded-full mb-4'>
        <BellIcon className='size-8 text-base-content opacity-40'/>
        </div>
        <h3 className='text-xl font-semibold mb-2'>No notification yet</h3>
        <p className='text-base-content opacity-70 max-w-md'>When you receive friend requests 
            or messages, they'ill appear hear</p>
    </div>
  )
}

export default NoNotificationFound
