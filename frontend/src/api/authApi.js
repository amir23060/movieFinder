const API_BASE_URL = 'http://localhost:8000/api'

export const authApi = {
  // User Register
  register: async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      return data
    } catch (error) {
      console.error('Register API error:', error)
      throw error
    }
  },

  // User Login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      return data
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  },

  // Get User Profile
  getUserProfile: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile')
      }

      return data
    } catch (error) {
      console.error('Get profile API error:', error)
      throw error
    }
  },

  // Add/Remove Liked Movie

 
}
export const addToFavorites =async(userId,{id,title,media_type,poster})=>{
    try{
        console.log(userId)
        const item = {id,title,media_type,poster}
        const res = await fetch(`${API_BASE_URL}/favorites/${userId}`,{
            method:"PATCH",
            headers: {
          'Content-Type': 'application/json',
        },body:JSON.stringify(item)
        })
        const data = await res.json()
        if(res.ok){
            return data.message
        }
        else{
            return data.message
        }


    }
    catch(error){
        console.log(error)
    }
}
export const getAllFavorites=async(userId)=>{
try{
    const res = await fetch(`${API_BASE_URL}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json()
      if(res.ok){
        return data.favorites
      }
      else{
        console.log(data.message)
      }

}catch(error){
        console.log(error)
    }
}
export const removeFromfavorites=async(userId,id)=>{
try{
    const res = await fetch(`${API_BASE_URL}/favorites/remove/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },body:JSON.stringify({id})
      })
      const data = await res.json()
      if(res.ok){
        return data.message
      }
      else{
        console.log(data.message)
      }

}catch(error){
        console.log(error)
    }
}
