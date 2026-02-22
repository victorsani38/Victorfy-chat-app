import React, { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { completeOnBoarding } from '../api/api'
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import { LANGUAGES } from '../constants'
import useOnboard from '../hooks/useOnboard'

const OnboardPage = () => {
  const {authUser} = useAuthContext()
  const [userData, setUserData] = useState({
    fullName:authUser?.fullName || "",
    bio:authUser?.bio || "",
    nativeLanguage:authUser?.nativeLanguage || "",
    learningLanguage:authUser?.learningLanguage || "",
    location:authUser?.location || "",
    profilePic: authUser?.profilePic || ""
  })
 const {mutate, isPending, error} = useOnboard()

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(userData)
  }

  const handleAvater = () => {
  const idx = Math.floor(Math.random() * 100) + 1
  const random = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`
  setUserData({...userData, profilePic:random})
  toast.success("Random profile pic generated")
  }
  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center'> 
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your onboarding</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex items-center flex-col justify-center space-y-4'>
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {userData.profilePic ?(
                  <img src={userData.profilePic} 
                  alt="profile preview" 
                  className='w-full h-full object-cover'
                  />  
                ):(
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40'/>
                  </div>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <button type="submit"className='btn btn-accent' onClick={handleAvater}>
                  <ShuffleIcon className='size-4 mr-2'/>
                  Generate Random Avater
                </button>
              </div>
            </div>
            <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input
                 type="text" 
                 name='full name'
                 className='input input-bordered w-full'
                 value={userData.fullName}
                 onChange={(e)=>{setUserData({...userData, fullName:e.target.value})}}
                 placeholder='your full name'
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Bio</span>
                </label>
                <textarea
                  name='bio'
                  className='textarea textarea-bordered h-24'
                  value={userData.bio}
                  onChange={(e)=>setUserData({...userData, bio:e.target.value})}
                  placeholder='Tell others about yourself and your goals'
                  />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Native Language</span>
                  </label>
                  <select 
                  name="native language"
                  className='select select-bordered w-full'
                  value={userData.nativeLanguage}
                  onChange={(e)=>setUserData({...userData, nativeLanguage:e.target.value})}
                  >
                  <option value="" >Select your native language</option>
                  {LANGUAGES.map((lang)=>(
                   <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                   </option>
                  ))}
                  </select>
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Learning Language</span>
                  </label>
                  <select 
                  name="native language"
                  className='select select-bordered w-full'
                  value={userData.learningLanguage}
                  onChange={(e)=>setUserData({...userData, learningLanguage:e.target.value})}
                  >
                  <option value="" >Select language you're learning</option>
                  {LANGUAGES.map((lang)=>(
                   <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                   </option>
                  ))}
                  </select>
                </div>
              </div>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform 
                -translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
                <input 
                type="text"
                name="location"
                className='input input-bordered pl-10 w-full'
                placeholder='City, Country'
                value={userData.location}
                onChange={(e)=>setUserData({...userData, location:e.target.value})}
                />
              </div>
              <button 
              type='submit'
              className='btn btn-primary w-full'
              disabled={isPending}
              >
              {!isPending ? (
                <>
                <ShipWheelIcon className='size-5 mr-2'/>
                Complete Onboarding
                </>
              ) : (
                 <>
                <LoaderIcon className='size-5 mr-2 animate-spin'/>
                Onboarding...
                </>
              )}
              </button>
          </form>

        </div>
      
      </div>      
    </div>
  )
}

export default OnboardPage
