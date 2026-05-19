import { useEffect, useState } from "react"
import "./item_grid.css"
import { useNavigate } from "react-router-dom"
import { Item_modal } from "../item_modal/item_modal"

function ItemGrid({ userId,api, name, media_type,setSearchOpen }) {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  const navigate = useNavigate()

useEffect(() => {
  if (typeof api === "function") {
    Promise.resolve(api()).then(setItems)
  } else {
    setItems(api || [])
  }
}, [api])

  const sliceItems = items.slice(0, 23)

  return (
    <>
      {selectedItem && (
        <Item_modal
          itemId={selectedItem.id}
          media_type={selectedItem.media_type}
          setItemId={setSelectedItem}
          userId={userId}
          
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

  setSelectedItem({
    id: item.id,
    media_type:
      item.media_type || media_type
  })
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