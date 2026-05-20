import { useEffect, useState } from "react"
import "./item_grid.css"
import { useNavigate } from "react-router-dom"
import { Item_modal } from "../item_modal/item_modal"
import { useModal } from "../../Context/modalContext"


function ItemGrid({
  api,
  name,
  media_type,
  setSearchOpen
}) {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  const { openModal, itemId } =
    useModal()

  useEffect(() => {
    if (typeof api === "function") {
      Promise.resolve(api())
        .then(setItems)
    } else {
      setItems(api || [])
    }
  }, [api])

  const sliceItems =
    items.slice(0, 23)

  return (
    <>
      {itemId && <Item_modal />}

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

                openModal(
                  item.id,
                  item.media_type ||
                    media_type
                )
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  item.poster_path ||
                  item.poster
                }`}
              />

              <p>
                {item.title ||
                  item.name}
              </p>
            </div>
          ))}
        </main>
      </div>
    </>
  )
}

export { ItemGrid }