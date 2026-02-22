import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import OnboardPage from './pages/OnboardPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import  {Toaster} from "react-hot-toast"
import API from './api/axios'
import { useQuery } from '@tanstack/react-query'
import PageLoader from './components/PageLoader'
import { getUseAuth } from './api/api'
import useAuthContext from './hooks/useAuthContext'
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore'

const App = () => {

  useEffect(() => {
  document.body.className = "theme-whatsapp" 
}, [])

   const {authUser, isLoading} = useAuthContext()

   const isAuthenticated = Boolean(authUser)
   const isOnBoarded = authUser?.isOnboarded

   const {theme} = useThemeStore()

  if(isLoading)return <PageLoader/>
  
  return (
      <div className='h-screen'  data-theme={theme}>
        <Routes>
          <Route path='/' element={isAuthenticated && isOnBoarded
           ?(<Layout showSideBar={true}><HomePage/></Layout>):(
            <Navigate to={!isAuthenticated?"/login" : "/onBoard"}/>
           )}/>
          <Route path='/login' element={!isAuthenticated ? <LoginPage/> :
           <Navigate to={isOnBoarded?"/" : "/onBoard"}/>}/>
          <Route path='/sign-up' element={!isAuthenticated ? <SignUpPage/> : <Navigate to={isOnBoarded?"/" : "/onBoard"}/>}/>
          <Route path='/onBoard' element={
            isAuthenticated?(
              (!isOnBoarded?(<OnboardPage/>):(<Navigate to="/login"/>))
            ):(
              <Navigate to="/login"/>
            )
          }/>
          <Route path='/notification' element={isAuthenticated && isOnBoarded?(
            <Layout showSideBar={true}><NotificationPage/></Layout>
          ):(<Navigate to={!isAuthenticated ? "/login" : "/onBoard"}/>)}/>
          <Route path='/call/:id' element={isAuthenticated && isOnBoarded?(
            <CallPage/>
          ):(<Navigate to={!isAuthenticated ? "/login" : "/onBoard"}/>)}/>
          <Route path='/chat/:id' element={isAuthenticated && isOnBoarded ?(
            <Layout showSideBar={false}><ChatPage/></Layout>
          ):(
            <Navigate to={!isAuthenticated ? "/login" : "/onBoard"} />
          )}/>
        </Routes>
        <Toaster toastOptions={{duration:2000, position:"top-right"}}/>
       </div>

  )
}

export default App
