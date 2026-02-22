import API from "./axios"

export const getUseAuth  = async () => {
   try{
   const res = await API.get("/auth/me") 
    return res.data
   } 
   catch(error) {
    return null
   } 
}

export const signup = async(signUpData) => {
    const res = await API.post("/auth/sign-up", signUpData)
    return res.data
}

export const completeOnBoarding = async(userData) => {
    const res = await API.put("/auth/onboard", userData)
    return res.data
    }
export const loginUser = async (loginData) => {
    const res = await API.post("/auth/login", loginData)
    return res.data
    }

export const logoutUser = async () => {
  const res = await API.post("/auth/logout")
  return res.data     
}

export const getFriends = async() => {
    const res = await API.get("/users/friends")
    return res.data
}

export const getRecommendedFriends = async() => {
    const res = await API.get("/users")
    return res.data    
}

export const getOutGoingFriends = async() => {
    const res = await API.get("/users/outgoing-friend-request")
    return res.data    
}

export const sendFriendRequest = async(userId) => {
    const res = await API.post(`/users/friend-request/${userId}`)
    return res.data
}
 
export const getFriendRequest = async() => {
    const res = await API.get(`/users/friend-requests`)
    return res.data
}

export const acceptFriendRequest = async(userId) => {
    const res = await API.put(`/users/friend-request/${userId}/accept`)
    return res.data
}

export const getStreamToken = async() => {
    const res = await API.post("/chat/token")
    return res.data
}
 