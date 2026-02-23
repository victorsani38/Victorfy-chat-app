import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react'
import { acceptFriendRequest, getFriendRequest } from '../api/api'
import NoNotificationFound from '../components/NoNotificationFound'

const NotificationPage = () => {

  const queryClient = useQueryClient()

  const {data:friendRequest, isLoading} = useQuery({
    queryKey:["friendRequest"],
    queryFn: getFriendRequest
  })

  const {mutate, isPending} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["friendRequest"]})
      queryClient.invalidateQueries({queryKey:["friends"]})
    }
  })

  const incomingRequests = friendRequest?.incomingRequest || []
  const acceptedRequests = friendRequest?.acceptedRequest || []

  
  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>Notifications</h1>
        {isLoading ?(
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ):(
          <>
           {incomingRequests.length > 0 &&(
            <section className='space-y-4'>
              <h2 className='font-semibold text-xl flex items-center gap-2'>
              Friend requests
              <UserCheckIcon className="h-5 w-5 text-primary"/>
              <span className='badge badge-primary ml-2'>{incomingRequests.length}</span>
              </h2>
              <div className='space-y-3'>
                {incomingRequests.map((request) =>(
                  <div key={request._id}
                  className='card bg-base-200 shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='card-body p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='avatar w-14 h-14 rounded-full bg-base-300'>
                            <img src={request.sender?.profilePic} alt={request.sender.fullName} />
                          </div>
                          <div>
                            <h3 className='font-semibold'>{request.sender.fullName}</h3>
                            <div className='flex flex-wrap gap-1.5 mt-1'>
                              <span className='badge badge-secondary badge-sm'>
                                Native: {request.sender?.nativeLanguage}
                              </span>
                              <span className='badge badge-outline badge-sm'>
                                Learning: {request.sender?.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button className='btn-primary btn btn-sm'
                          onClick={()=>mutate(request._id)}
                          disabled={isPending}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
           )}
           {incomingRequests.length === 0 && acceptedRequests.length === 0 &&(
            <NoNotificationFound/>
           )}
          </>
        )}
        {acceptedRequests.length > 0 &&(
          <section className='space-y-4'>
            <h2 className='text-xl font-semibold flex items-center gap-2'>
            <BellIcon className='h-5 w-5 text-success'/>
            New Connections
            </h2>
            <div className='space-y-3'>
              {acceptedRequests.map((notification)=>(
              <div key={notification._id} className='bg-base-200 shadow-sm'>
                <div className='card p-4'>
                  <div className='flex items-start gap-3'>
                    <div className='avatar mt-1 size-10 rounded-full'>
                      <img 
                      src={notification.recepient.profilePic} 
                      alt={notification.recepient.profilePic} />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold'>{notification.recepient.fullName}</h3>
                      <p className='text-sm my-1'>
                        {notification.recepient.fullName}: Accepted your friend request
                      </p>
                      <p className='text-xs items-center opacity-70 flex'>
                        <ClockIcon className='h-3 w-3 mr-1'/>
                        Recently
                      </p>
                    </div>
                    <div className='badge badge-success'>
                      <MessageSquareIcon className='h-3 w-3 mr-1'/>
                      New Friend
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </section>
        )}

      </div>
    
    </div>
  )
}

export default NotificationPage
