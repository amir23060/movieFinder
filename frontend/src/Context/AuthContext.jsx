import {
  createContext,
  useContext,
  useState
} from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthProvider({ children }) {
    const navigate =useNavigate()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )
  const logOut = ()=>{
    localStorage.removeItem("user")
    navigate("/")

  }

  return (
    <AuthContext.Provider
      value={{ user, setUser,logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }