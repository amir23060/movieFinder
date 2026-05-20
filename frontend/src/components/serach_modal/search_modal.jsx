import "./search_modal.css"
import { ItemGrid }
from "../item_grid/item_grid"
import { useSearch } from "../../Context/searchContext"



function Search_modal({
  api
}) {
  const {
    query,
    setSearchOpen
  } = useSearch()

  return (
    <div
      className="search-container"
      onClick={() =>
        setSearchOpen(false)
      }
    >
      <div
        className="search-modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={() =>
            setSearchOpen(false)
          }
        >
          ✕
        </button>

        <ItemGrid
          api={api}
          name={`Search of ${query}`}
          media_type={null}
        />
      </div>
    </div>
  )
}

export { Search_modal }