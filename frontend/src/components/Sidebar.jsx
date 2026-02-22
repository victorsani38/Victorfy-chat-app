import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from 'lucide-react';



const Sidebar = () => {
  const {authUser} = useAuthContext()
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath)
  return (
    <aside className={`w-64 bg-base-200 border-r border-base-300 
          flex flex-col min-h-screen`}>
      <div className='border-b p-5 border-base-300'>
        <Link to="/" className='text-center flex gap-2.5'>
        <ShipWheelIcon className='size-9 text-primary'/>
        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent
        bg-gradient-to-r from-primary to-secondary tracking-wider
        '>
          Victorfy
        </span>
        </Link>

      </div>
      <nav className='flex-1 p-4 space-y-1'>
        <Link
        to="/"
        className={`btn btn-ghost justify-start w-full 
          gap-3 p-3 normal-case ${currentPath === "/"?'btn-active' : " "}`}
        >
          <HomeIcon className='size-5 opacity-70 text-base-content'/>
          <span>Home</span>
        
        </Link>
        <Link
        to="/friends"
        className={`btn btn-ghost justify-start w-full 
          gap-3 p-3 normal-case ${currentPath === "/friends"?'btn-active' : " "}`}
        >
          <UsersIcon className='size-5 opacity-70 text-base-content'/>
          <span>Friends</span>
        
        </Link>
        <Link
        to="/notification"
        className={`btn btn-ghost justify-start w-full 
          gap-3 p-3 normal-case ${currentPath === "/notification"?'btn-active' : " "}`}
        >
          <BellIcon className='size-5 opacity-70 text-base-content'/>
          <span>Notifications</span>
        
        </Link>
      </nav>
      <div className='p-4 border-t border-base-300 mt-auto'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='w-10 rounded-full'>
              <img src={authUser?.profilePic} alt="user avater" />
            </div>
          </div>
          <div className='flex-1'>
            <p className='font-semibold text-sm'>{authUser?.fullName}</p>
            <p className='text-xs text-success flex items-center gap-1'>
              <span className='size-2 rounded-full bg-success inline-block'> </span>
              Online
            </p>
          </div>
        </div>

      </div>
    </aside>
  )
}

export default Sidebar
