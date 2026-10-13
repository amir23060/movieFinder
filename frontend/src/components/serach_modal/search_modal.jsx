import { useDispatch, useSelector } from "react-redux"
import { closeSearch } from "../../features/search/searchSlice"
import { ItemGrid } from "../item_grid/item_grid"

function Search_modal() {
  const dispatch = useDispatch()

  const {
    results,
    query
  } = useSelector(state => state.search)

  return (
    <div
      className="search-container"
      onClick={() => dispatch(closeSearch())}
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
            dispatch(closeSearch())
          }
        >
          ✕
        </button>

        <ItemGrid
          api={results}
          name={`Search results for "${query}"`}
        />
      </div>
    </div>
  )
}

export { Search_modal }