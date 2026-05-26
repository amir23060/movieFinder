import { useState } from "react";
import { ItemGrid } from "../../components/item_grid/item_grid";
import { useParams, useNavigate } from "react-router-dom";
import { getMovies } from "../../api/movieApi";

import { Navbar } from "../../components/navbar/navbar";
import "./items.css";
import { getSeries } from "../../../api/seriesApi";

function Item(){
    const { userId, media_type } = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)


    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    return (
        <div className="items-page-container">
  
            <div className="items-content">
                 
            
                <ItemGrid 
                    name={media_type === "movie" ? "All Movies" : "All Series"} 
                    api={media_type === "movie" ? () => getMovies(page) : () => getSeries(page)} 
                    media_type={media_type}
                />
                <div className="pagination">
                    <button 
                        className="pagination-btn prev-btn" 
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                    >
                        ← Previous
                    </button>
                    <span className="page-info">Page {page}</span>
                    <button 
                        className="pagination-btn next-btn" 
                        onClick={handleNextPage}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}

export {Item}