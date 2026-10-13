import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { Search } from "../search/search"
import { useAuth } from "../../Context/AuthContext"
import { useFavorite } from "../../Context/favoriteContext"
function Navbar({query,setQuery,results,setResults}) {
    const navigate= useNavigate()
    const {user,logOut}= useAuth()
    const {allFavorites}=useFavorite()
    
    return(<>
    <div className="nav-container">
        <div className="navigating">
            <h2 onClick={()=> navigate(`/home/${user?._id}`)}>🎬 MovieFinder</h2>
            <button  onClick={() => navigate(`/all/${user?._id}/movie`)}>Movies</button>
            <button  onClick={() => navigate(`/all/${user?._id}/tv`)}>Series</button>
        </div>
        <Search />
        <div className="nav-buttons">
                       <div className="favorited"> {allFavorites.length>0? <span className="counter">{allFavorites.length}</span>:""} <button className="favorite" onClick={()=>navigate(`/favorites/${user?._id}`)}> Favorites</button></div>
            <button className="logout" onClick={logOut}>Log out</button>
        </div>
    </div>
    </>)
}
export {Navbar}