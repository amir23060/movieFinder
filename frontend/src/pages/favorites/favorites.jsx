import { ItemGrid } from "../../components/item_grid/item_grid"
import {  useNavigate } from "react-router-dom"
import "./favorites.css"
import { useSelector } from "react-redux"

function Favorites(){
    const {user}=useSelector(state=>state.auth)
    const navigate = useNavigate()
    const {items,loading}=useSelector(state=>state.favorites)

    if (loading) {
        return (
            <div className="favorites-page-container">
                
                <div className="favorites-content">
                    <p className="loading">Loading favorites...</p>
                </div>
            </div>
        )
    }

    if (!items || items.length === 0) {
        return (
            <div className="favorites-page-container">
                <div className="favorites-content">
                      
                    <div className="empty-favorites">
                        <h1>❤️ Favorites</h1>
                        <p>No favorites yet</p>
                        <p className="empty-message">Start adding movies and series to your favorites!</p>
                        <button className="explore-btn" onClick={() => navigate(`/home/${user?._id}`)}>
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="favorites-page-container">
            <div className="favorites-content">
                <ItemGrid 
                    api={() => Promise.resolve(items)} 
                    name={"My Favorites"} 
                    media_type={null}
                />
            </div>
        </div>
    )
}

export {Favorites}