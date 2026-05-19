import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { Search } from "../search/search"
function Navbar({userId,query,setQuery,results,setResults}) {
    const navigate= useNavigate()
    const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }
    return(<>
    <div className="nav-container">
        <div className="navigating">
            <h2 onClick={()=> navigate(`/home/${userId}`)}>🎬 MovieFinder</h2>
            <button  onClick={() => navigate(`/all/${userId}/movie`)}>Movies</button>
            <button  onClick={() => navigate(`/all/${userId}/tv`)}>Series</button>
        </div>
        <Search userId={userId} query={query} setQuery={setQuery} results={results} setResults={setResults} />
        <div className="nav-buttons">
            <button className="favorite" onClick={()=>navigate(`/favorites/${userId}`)}>Favorites</button>
            <button className="logout" onClick={()=>handleLogout}>Log out</button>
        </div>
    </div>
    </>)
}
export {Navbar}