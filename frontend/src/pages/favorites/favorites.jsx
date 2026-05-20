import { useEffect, useState } from "react"
import { ItemGrid } from "../../components/item_grid/item_grid"
import { useParams, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/navbar/navbar"
import "./favorites.css"
import { useAuth } from "../../Context/AuthContext"
import { useFavorite } from "../../Context/favoriteContext"

function Favorites(){
    const {user}= useAuth()
    const navigate = useNavigate()
    
    const {allFavorites}=useFavorite()
console.log(user?._id)
   

    if (!allFavorites || allFavorites.length === 0) {
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
                    api={() => Promise.resolve(allFavorites)} 
                    name={"My Favorites"} 
                    media_type={null}
                />
            </div>
        </div>
    )
}

export {Favorites}