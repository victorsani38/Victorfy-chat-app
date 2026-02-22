import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logoutUser } from '../api/api'

const useLogOut = () => {
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["authUser"]})
      
    }
  })
  return {mutate}
}

export default useLogOut
