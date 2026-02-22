import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getUseAuth } from '../api/api';

const useAuthContext = () => {
  const authUser = useQuery({
    queryKey:["authUser"],
    queryFn: getUseAuth,
    retry:false
  });

  return {isLoading:authUser.isLoading, authUser:authUser.data?.user}
}

export default useAuthContext
