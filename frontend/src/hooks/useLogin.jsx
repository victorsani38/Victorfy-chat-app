import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/api";
import toast from "react-hot-toast";

 const useLogin = () => {
    const queryClient = useQueryClient()
    
    const {mutate, isPending, error} = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
    queryClient.invalidateQueries({queryKey:["authUser"]});
    },
    onError: (error) => {
     const message = error.response?.data?.error
     toast.error(message)
    }
  })

  return {mutate, error, isPending}
}
  
  export default useLogin
  