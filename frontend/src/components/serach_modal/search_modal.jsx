import { ItemGrid } from "../item_grid/item_grid"
function Search_modal({
  api,
  query,
  userId,
  setSearchOpen
}) {
  return (
    <div
      className="search-container"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="search-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setSearchOpen(false)}
        >
          ✕
        </button>

        <ItemGrid
          api={api}
          name={"Search of " + query}
          userId={userId}
        />
      </div>
    </div>
  )
}
export { Search_modal }