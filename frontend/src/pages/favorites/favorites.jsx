import { useEffect, useState } from "react"
import { allFavorites } from "../../api/authApi"
import { ItemGrid } from "../../components/item_grid/item_grid"
import { useParams, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/navbar/navbar"
import "./favorites.css"

function Favorites(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        allFavorites({ userId: id }).then((data) => {
            setFavorites(data || [])
            setLoading(false)
        }).catch(() => {
            setFavorites([])
            setLoading(false)
        })
    }, [id])

    if (loading) {
        return (
            <div className="favorites-page-container">
                
                <div className="favorites-content">
                    <p className="loading">Loading favorites...</p>
                </div>
            </div>
        )
    }

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites-page-container">
                <div className="favorites-content">
                      
                    <div className="empty-favorites">
                        <h1>❤️ Favorites</h1>
                        <p>No favorites yet</p>
                        <p className="empty-message">Start adding movies and series to your favorites!</p>
                        <button className="explore-btn" onClick={() => navigate(`/home/${id}`)}>
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
                    api={() => Promise.resolve(favorites)} 
                    name={"My Favorites"} 
                    userId={id}
                    media_type={null}
                />
            </div>
        </div>
    )
}

export {Favorites}