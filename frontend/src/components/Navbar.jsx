import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from '../api/api'
import { BellIcon, LogOutIcon, Menu, ShipWheelIcon } from 'lucide-react'
import Themeselector from './Themeselector'
import useLogOut from '../hooks/useLogOut'

const Navbar = ({ showSideBar, onMenuClick }) => {
  const {authUser} = useAuthContext()
  const location = useLocation()
  const isChatPage = location.pathname?.startsWith("/chat")
  

  const {mutate} = useLogOut()
  return (
  <div className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 w-full'>
      
      <div className='flex items-center justify-between w-full'>
        {/* LEFT SIDE */}
        <div className='flex items-center gap-3'>
          {/* Mobile Menu Button */}
          {showSideBar && (
            <button 
              onClick={onMenuClick}
              className="btn btn-ghost btn-sm lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          )}
           {/* Logo (Show on mobile OR chat page) */}
            {(isChatPage || window.innerWidth < 1024) && (
              <Link to="/" className={`flex items-center gap-2.5 ${isChatPage ? "" : "lg:hidden"}`}>
                <ShipWheelIcon className='size-5 text-primary'/>
                <span className='font-bold font-mono text-xl bg-clip-text 
                  text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                  Victorfy
                </span>
              </Link>
            )}
        </div>
        {/* RIGHT SIDE */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <Link to="/notification">
            <button className='btn btn-ghost btn-circle'>
              <BellIcon className='h-6 w-6 text-base-content opacity-70'/>
            </button>
          </Link>
           <Themeselector/>
        <div className='avatar'>
          <div className='w-9 rounded-full'>
            <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
          </div>
        </div>
        <button className='btn btn-ghost btn-circle ' onClick={mutate}>
          <LogOutIcon className='h-6 w-6 text-base-content opacity-70'/>
        </button>
        </div>
      </div>
    </div>
  </div>
)

}

export default Navbar
