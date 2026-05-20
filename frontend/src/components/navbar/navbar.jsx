import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { Search } from "../search/search"
import { useAuth } from "../../Context/AuthContext"
function Navbar({query,setQuery,results,setResults}) {
    const navigate= useNavigate()
    const {user,logOut}= useAuth()
    
    return(<>
    <div className="nav-container">
        <div className="navigating">
            <h2 onClick={()=> navigate(`/home/${user?._id}`)}>🎬 MovieFinder</h2>
            <button  onClick={() => navigate(`/all/${user?._id}/movie`)}>Movies</button>
            <button  onClick={() => navigate(`/all/${user?._id}/tv`)}>Series</button>
        </div>
        <Search />
        <div className="nav-buttons">
            <button className="favorite" onClick={()=>navigate(`/favorites/${user?._id}`)}>Favorites</button>
            <button className="logout" onClick={logOut}>Log out</button>
        </div>
    </div>
    </>)
}
export {Navbar}