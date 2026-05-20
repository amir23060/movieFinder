import { useSearch } from "../../Context/searchContext"
import "./search.css"

function Search() {
  const {
    query,
    setQuery
  } = useSearch()

  return (
    <input
      className="input"
      value={query}
      type="text"
      onChange={(e) =>
        setQuery(e.target.value)
      }
      placeholder="Search movies or series..."
    />
  )
}

export { Search }