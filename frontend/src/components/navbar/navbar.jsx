import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { Search } from "../search/search"
import { logOut } from "../../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
function Navbar({query,setQuery,results,setResults}) {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const userId = user ? user._id : null
    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }
    return(<>
    <div className="nav-container">
        <div className="navigating">
            <h2 onClick={()=> navigate(`/home`)}>🎬 MovieFinder</h2>
            <button  onClick={() => navigate(`/all/${userId}/movie`)}>Movies</button>
            <button  onClick={() => navigate(`/all/${userId}/tv`)}>Series</button>
        </div>
        <Search userId={userId} query={query} setQuery={setQuery} results={results} setResults={setResults} />
        <div className="nav-buttons">
            <button className="favorite" onClick={()=>navigate(`/favorites`)}>Favorites</button>
            <button className="logout" onClick={handleLogout}>Log out</button>
        </div>
    </div>
    </>)
}
export {Navbar}