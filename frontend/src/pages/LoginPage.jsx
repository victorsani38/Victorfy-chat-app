import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { loginUser } from '../api/api'
import { ShipWheelIcon } from 'lucide-react'
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {isPending, error, mutate} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(loginData)
  }
   return (
    <div className='h-screen flex items-center justify-center p-4 
     sm:p-6 md:p-8'data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row
       w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
       <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon  className="size-9 text-primary"/>
           <span className='text-3xl font-bold font-mono bg-clip-text text-transparent 
            bg-gradient-to-r from-primary to-secondary tracking-wider'>
            Victorfy
            </span>
          </div>
          <div className='w-full'>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div >
                  <h2 className='text-xl font-semibold'>Welcome Back</h2>
                  <p className='text-sm opacity-70'>Sign in to your account to continue to interact with friends and family</p>
                </div>
                <div className='space-y-3'>
                   <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email Address</span>
                    </label>
                    <input
                    type='email'
                    placeholder='John@gmail.com'
                    className='input input-bordered w-full'
                    value={loginData.email}
                    onChange={(e)=>{setLoginData({...loginData, email:e.target.value})}}
                    required
                    />
                  </div>
                   <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input
                    type='password'
                    placeholder='********'
                    className='input input-bordered w-full'
                    value={loginData.password}
                    onChange={(e)=>{setLoginData({...loginData, password:e.target.value})}}
                    required
                    />
                    <p className='text-xs opacity-70 mt-1'>Password must be at least 6 charater long</p>
                  </div>
                </div>
                <button className='btn btn-primary w-full'>
                  {isPending ? 
                  (<>
                  <span className='loading loading-spinner loading-xs'>Loading...</span>
                  </>) : 
                  ("Sign in")}
                </button>
                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Don't have an account?{" "}
                    <Link to="/sign-up" className='text-primary hover:underline'>
                    Create one
                    </Link>
                  </p>
                </div>
              </div>
            </form>

          </div>
        </div>
        <div className='hidden lg:flex w-ful lg:w-1/2 btn-primary/10 items-center justify-center'>
            <div className='max-w-md p-8'>
              <div className='relative aspect-square mx-w-sm mx-auto'>
                <img src="/VideoCall.png" alt="connection illustration" className='w-full h-full' />
              </div>
              <div className='text-center space-y-3 mt-6'>
                <p className='text-xl font-semibold'>connect with friends and partner worldwide</p>
                <p className='opacity-70'>Practise conversation, make friends, and learn new skills</p>
              </div>
            </div>
        </div>
      </div>
     
    </div>
  )
}

export default LoginPage
 