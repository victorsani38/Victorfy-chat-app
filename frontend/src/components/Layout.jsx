import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Menu } from 'lucide-react'

const Layout = ({showSideBar=false, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  
 
   return (
    <div className='min-h-screen bg-base-100 overflow-x-hidden'>
      <div className='flex'>

        {/* Desktop Sidebar */}
        {showSideBar && (
          <div className="hidden lg:flex">
            <Sidebar />
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex"
            >         
            <div 
              className="absolute inset-0 bg-black/40"
                 onClick={() => setIsOpen(false)}
            />

            <div className="relative w-64 h-full bg-base-200 shadow-xl">
              <Sidebar />
            </div>
          </div>
        )}

        <div className='flex flex-1 flex-col'>
          {/* Navbar Row */}
            <Navbar  showSideBar={showSideBar}
            onMenuClick={() => setIsOpen(true)}/>
          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
