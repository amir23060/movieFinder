import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./item_modal.css"

import {
  closeModal,
  openTrailer,
  closeTrailer,
  fetchItemModal
} from "../../features/modal/modalSlice"

import {
  addUserFavorite,
  removeUserFavorite
} from "../../features/favorites/favoritesSlice"

function Item_modal() {
  const dispatch = useDispatch()

  const {
    item,
    trailerKey,
    showTrailer,
    itemId,
    media_type,
    isOpen
  } = useSelector((state) => state.itemModal)

  const { items } = useSelector((state) => state.favorites)

  const { user } = useSelector((state) => state.auth)
  const userId = user?._id

  const [favorite, setFavorite] = useState(false)

  // FETCH ITEM WHEN MODAL OPENS
  useEffect(() => {
    if (itemId && media_type) {
      dispatch(fetchItemModal({ itemId, media_type }))
    }
  }, [itemId, media_type, dispatch])

  // CHECK FAVORITE STATUS
  useEffect(() => {
    const exists = items?.find((e) => Number(e.id) === Number(itemId))
    setFavorite(!!exists)
  }, [items, itemId])

  const modalClose = () => {
    dispatch(closeModal())
  }

  const handleTrailerClick = () => {
    dispatch(openTrailer())
  }

  if (!isOpen) return null

  return (
    <>
      {/* MODAL */}
      <div className="item-modal-overlay" onClick={modalClose}>
        <div
          className="item-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={modalClose}>
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

                  <p className="overview">{item.overview}</p>

                  <div className="button-group">
                    <button
                      className="trailer-btn"
                      onClick={handleTrailerClick}
                      disabled={!trailerKey}
                    >
                      ▶ Trailer
                    </button>

                    <button
                      className="add-btn"
                      onClick={() =>
                        favorite
                          ? dispatch(removeUserFavorite({ id: item.id }))
                          : dispatch(
                              addUserFavorite({
                                media_type,
                                id: item.id,
                                title: item.name || item.title,
                                poster: item.poster_path
                              })
                            )
                      }
                    >
                      {favorite
                        ? "Remove from favorites"
                        : "+ Add to favorites"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && trailerKey && (
        <div
          className="modal-overlay"
          onClick={() => dispatch(closeTrailer())}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => dispatch(closeTrailer())}
            >
              ✕
            </button>

            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
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