import { useEffect, useState } from "react"
import { getMovieDetails, getSimilarMovies, getMovieVideos } from "../../api/movieApi"
import { getSerieDetails, getSimilarSeries, getSerieVideos } from "../../api/seriesApi"
import { useParams } from "react-router-dom"
import "./item_details.css"
import { ItemGrid } from "../../components/item_grid/item_grid"

function Item_details(){
    const [item,setItem]=useState(null)
    const [videos, setVideos]=useState([])
    const [showTrailer, setShowTrailer]=useState(false)
    const [trailerKey, setTrailerKey]=useState(null)
  const {id,media_type}=useParams()
  console.log(item)
  
    useEffect(()=>{
        if(media_type === "movie"){
            getMovieDetails(id).then(setItem)
            getMovieVideos(id).then(data => {
                setVideos(data.results || [])
                const trailer = data.results?.find(v => v.type === "Trailer" && v.site === "YouTube")
                if(trailer) setTrailerKey(trailer.key)
            })
        }
        else{
            getSerieDetails(id).then(setItem)
            getSerieVideos(id).then(data => {
                setVideos(data.results || [])
                const trailer = data.results?.find(v => v.type === "Trailer" && v.site === "YouTube")
                if(trailer) setTrailerKey(trailer.key)
            })
        }
    },[id, media_type])
    
    const handleTrailerClick = () => {
        if(trailerKey) {
            setShowTrailer(true)
        }
    }
    
    const closeTrailer = () => {
        setShowTrailer(false)
    }
    return(<>
    {item && <div className="detail-container">
      <div className="details">
          <section className="highlight">
              <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} />
        </section>
        <section className="item">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
                <div className="information">
                    <h2>{item.title || item.name}</h2>
                    <p className="overview">{item.overview}</p>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Genre:</span>
                            <span className="value">{item.genres?.map((genre) => genre.name).join(", ")}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Rating:</span>
                            <span className="value">{item.vote_average?.toFixed(1)}/10</span>
                        </div>
                        {item.runtime && <div className="info-item">
                            <span className="label">Runtime:</span>
                            <span className="value">{item.runtime}m</span>
                        </div>}
                        <div className="info-item">
                            <span className="label">Release:</span>
                            <span className="value">{new Date(item.release_date || item.first_air_date).getFullYear()}</span>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="trailer-btn" onClick={handleTrailerClick} disabled={!trailerKey}>
                            ▶ Trailer
                        </button>
                        <button className="add-btn">+ Add to List</button>
                    </div>
                </div>
        </section>
      </div>
      <div className="similar">
        <ItemGrid name={`Similar ${media_type}`}   media_type={media_type} api={media_type==="movie"? ()=>getSimilarMovies(id):()=>getSimilarSeries(id) }/>
      </div>
    </div>}
    
    {showTrailer && trailerKey && (
        <div className="modal-overlay" onClick={closeTrailer}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeTrailer}>✕</button>
                <div className="video-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )}
    </>)


}
export {Item_details}