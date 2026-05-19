import { useEffect, useState } from "react"
import {
  getMovieDetails,
  getMovieVideos
} from "../../api/movieApi"
import "./item_modal.css"
import {
  getSerieDetails,
  getSerieVideos
} from "../../api/seriesApi"

import "./item_modal.css"
import { addToFavorites, allFavorites, removeFromfavorites } from "../../api/authApi"

function Item_modal({ userId,itemId, media_type, setItemId }) {
  const [item, setItem] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [favorite,setFavorite]=useState(false)
  const [message,setMessage]= useState("")
  const [allFavorite,setAllFavorites]=useState([])
console.log(userId)
const loadFavorites = async () => {

  if (!userId) return

  const data = await allFavorites({ userId })

  setAllFavorites(data)

}
useEffect(()=>{
   loadFavorites()
},[userId,itemId])
useEffect(() => {

  const favoriteItem = allFavorite.some(

    (e) => e.id === itemId

  )

  setFavorite(favoriteItem)

}, [itemId, allFavorite])

  useEffect(() => {
    if (!itemId) return

    if (media_type === "movie") {
      getMovieDetails(itemId).then(setItem)

      getMovieVideos(itemId).then((data) => {
        const trailer = data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        )

        if (trailer) {
          setTrailerKey(trailer.key)
        }
      })
    } else {
      getSerieDetails(itemId).then(setItem)

      getSerieVideos(itemId).then((data) => {
        const trailer = data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        )

        if (trailer) {
          setTrailerKey(trailer.key)
        }
      })
    }
  }, [itemId, media_type])

  const closeModal = () => {
    setItemId(null)
  }

  const handleTrailerClick = () => {
    if (trailerKey) {
      setShowTrailer(true)
    }
  }
 const addToFavorite = async ({
  id,
  title,
  media_type,
  poster
}) => {
  try {
    await addToFavorites({
      userId,
      id,
      title,
      media_type,
      poster,
      setMessage
    })

    await loadFavorites()
  } catch (err) {
    console.log(err)
  }
}
const removeFavorite = async () => {
  try {
    await removeFromfavorites({
      userId,
      id: itemId
    })

    await loadFavorites()
  } catch (err) {
    console.log(err)
  }
}

  return (
    <>
      <div className="item-modal-overlay" onClick={closeModal}>
        <div
          className="item-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={closeModal}>
            ✕
          </button>

          {item && (
            <>
              <div className="modal-backdrop">
                <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt=""
                />
              </div>

              <div className="modal-info">
                <img
                  className="modal-poster"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt=""
                />

                <div className="modal-text">
                  <h2>{item.title || item.name}</h2>

                  <p className="overview">
                    {item.overview}
                  </p>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Genre:</span>
                      <span className="value">
                        {item.genres
                          ?.map((g) => g.name)
                          .join(", ")}
                      </span>
                    </div>

                    <div className="info-item">
                      <span className="label">Rating:</span>
                      <span className="value">
                        {item.vote_average?.toFixed(1)}/10
                      </span>
                    </div>

                    {item.runtime && (
                      <div className="info-item">
                        <span className="label">Runtime:</span>
                        <span className="value">
                          {item.runtime}m
                        </span>
                      </div>
                    )}

                    <div className="info-item">
                      <span className="label">Release:</span>
                      <span className="value">
                        {new Date(
                          item.release_date ||
                            item.first_air_date
                        ).getFullYear()}
                      </span>
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      className="trailer-btn"
                      onClick={handleTrailerClick}
                      disabled={!trailerKey}
                    >
                      ▶ Trailer
                    </button>

                    <button  className="add-btn" onClick={() =>

  favorite

    ? removeFavorite()

    : addToFavorite({

        media_type,

        id: item.id,

        title: item.name || item.title,

        poster: item.poster_path

      })

}>
                      {favorite?"Remove from favorites":"+ Add to List"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div
          className="modal-overlay"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>

            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { Item_modal }