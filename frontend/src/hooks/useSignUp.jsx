
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { signup } from '../api/api'

const useSignUp = () => {
  const queryClient = useQueryClient()
  const {mutate, isPending, error} = useMutation({
    mutationFn: signup,
    onSuccess: () => {
    queryClient.invalidateQueries({queryKey:["authUser"]})
    toast.success("Account created successfully 🎉")
  },
  onError: (error) => {
    const message = error?.response?.data.error
    toast.error(message)
  }
  })
  return {mutate, error, isPending}
}

export default useSignUp
