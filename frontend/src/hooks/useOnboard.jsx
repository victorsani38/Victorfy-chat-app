import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeOnBoarding } from '../api/api'

const useOnboard = () => {
    const queryClient = useQueryClient()
    const {mutate, isPending, error} = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess:() => {
    queryClient.invalidateQueries({queryKey:["authUser"]})
    toast.success("onBoarding completed")
    },
    onError: (error) => {
      const message = error?.response?.data?.error
      console.log(error)
      toast.error(message)
    }
  })
  return {mutate, isPending, error}
}

export default useOnboard
