import { useEffect, useState } from "react"
import "./item_grid.css"
import { useNavigate } from "react-router-dom"
import { Item_modal } from "../item_modal/item_modal"
import { useDispatch, useSelector } from "react-redux"
import {

  openModal,

  fetchItemModal

} from "../../features/modal/modalSlice"
function ItemGrid({ api, name, media_type,setSearchOpen }) {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const {isOpen ,itemId,media_type:modalMediaType}= useSelector(state=>state.itemModal)
  const navigate = useNavigate()

useEffect(() => {
  if (typeof api === "function") {
    Promise.resolve(api()).then(setItems)
  } else {
    setItems(api || [])
  }
}, [api])
const {user}= useSelector(state=>state.auth)
const userId = user ? user._id : null
  const sliceItems = items.slice(0, 23)

  return (
    <>
      {isOpen && (
        <Item_modal
        />
      )}

      <div className="grid-container">
        <div className="grid-header">
          <h2>{name}</h2>

        </div>

        <main>
          {sliceItems?.map((item) => (
            <div
              key={item.id}
              className="item-card"
       onClick={() => {
  if (setSearchOpen) {
    setSearchOpen(false)
  }

  const modalData = {
    itemId: item.id,
    media_type:
      item.media_type || media_type
  }

  dispatch(openModal(modalData))
  dispatch(fetchItemModal(modalData))
}}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.poster}`}
              />

              <p>{item.title || item.name}</p>
            </div>
          ))}
        </main>
      </div>
    </>
  )
}

export { ItemGrid }