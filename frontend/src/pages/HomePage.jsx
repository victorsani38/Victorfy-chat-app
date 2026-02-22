import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getFriends, getOutGoingFriends, getRecommendedFriends, sendFriendRequest } from '../api/api'
import { Link } from 'react-router-dom'
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from 'lucide-react'
import FriendCard, { getLanguageFlag } from '../components/FriendCard'
import NofrendFound from '../components/NofrendFound'
import { capitalize } from '../api/utils'



const HomePage = () => {
  const [outGoingRequestIds, setOutGoingRequestIds] = useState(new Set)
  const queryClient = useQueryClient()

  const {data:friends=[], isLoading:loadingFriends} = useQuery({
    queryKey:["friends"],
    queryFn:getFriends,
   
  })
  const {data:recommendedUsers=[], isLoading:loadingUsers} = useQuery({
    queryKey:["users"],
    queryFn:getRecommendedFriends,
   
  })

  const {data:outGoingFriendReq} = useQuery({
    queryKey:["outGoingFriendReq"],
    queryFn:getOutGoingFriends
  })

  const {mutate, isPending} = useMutation({
    mutationFn:sendFriendRequest,
    onSuccess:() => {
    queryClient.invalidateQueries(["outGoingFriendReq"])
    }
  })

  useEffect(()=>{
  const outGoingId = new Set()
  if(outGoingFriendReq && outGoingFriendReq.length > 0){
    outGoingFriendReq.forEach((req)=>(
      outGoingId.add(req.recepient._id)
    ))
    setOutGoingRequestIds(outGoingId)
  }
  },[outGoingFriendReq])

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto w-full space-y-10'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your friends</h2>
          <Link to="/notification" className='btn btn-outline btn-sm'>
          <UsersIcon className='mr-2 size-4'/>
          Friend Requests
          </Link>
        </div>
        {loadingFriends ?(
          <div className='flex justify-center p-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ):friends.length == 0 ?(
          <NofrendFound/>
        ):(
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {friends.map((friend)=>(
              <FriendCard key={friend._id} friend={friend}/>
            ))}
          </div>
        )}
        <section>
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet new friends</h2>
                <p className='opacity-70'>Discover amazing friends based on your profile</p>
              </div>
            </div>
          </div>
          {loadingUsers ? (
            <div className='flex justify-center p-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
          ):recommendedUsers.length == 0 ?(
            <div className='card bg-base-200 p-6 items-center'>
              <h3 className='font-semibold text-lg mb-2'>No recommendations available</h3>
              <p className='text-base-content opacity-70'>Check back later for your new friends</p>
            </div>
        ):(
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {recommendedUsers.map((user)=>{
              const hasRequestBeenSent = outGoingRequestIds.has(user._id)
              return(
              <div key={user._id} className='card bg-base-200 shadow-sm hover:shadow-md transition-all duration-300 h-full'>
                <div className='card-body p-6 flex flex-col gap-5'>
                  <div className='flex gap-3 items-center'>
                    <div className='avartar rounded-full size-16'>
                      <img src={user.profilePic} alt={user.fullName} />
                    </div>
                    <div>
                      <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                      {user.location &&(
                        <div className='flex items-center text-xs opacity-70 mt-1'>
                          <MapPinIcon className='size-3 mr-1'/>
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className='flex flex-wrap gap-1.5'>
                      <span className='badge badge-secondary'>
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitalize(user.nativeLanguage)}
                      </span>
                      <span className='badge badge-outline'>
                        {getLanguageFlag(user.learningLanguage)}
                        Learning: {capitalize(user.learningLanguage)}
                      </span>
                    </div>
                  </div>
                  {user.bio &&(<p className='tex-sm opacity-70'>{user.bio}</p>)}
                  <button
                  className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`}
                  onClick={() =>mutate(user._id)}
                  disabled={hasRequestBeenSent || isPending}
                  >
                  {hasRequestBeenSent ?(
                    <>
                    <CheckCircleIcon className='size-4 mr-2'/>
                    Request sent
                    </>
                  ):(
                    <>
                    <UserPlusIcon className='size-4 mr-2'/>
                    Send Friend Request
                    </>
                  )}
                  </button>
                </div>
              </div>
              )
           })}
          </div>
        )}
        </section>
      </div>
    </div>
  )  
}

export default HomePage


