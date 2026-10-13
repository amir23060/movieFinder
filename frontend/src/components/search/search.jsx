import { useEffect } from "react"
import { multiSearch } from "../../../api/movieApi"
import { useDispatch, useSelector } from "react-redux"
import {
  setQuery,
  setResults,
  setLoading
} from "../../features/search/searchSlice"
import "./search.css"

function Search() {
  const dispatch = useDispatch()

  const { query } = useSelector(
    state => state.search
  )

  useEffect(() => {
    if (!query?.trim()) {
      dispatch(setResults([]))
      return
    }

    dispatch(setLoading(true))

    multiSearch(query)
      .then(res => {
        dispatch(setResults(res || []))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }, [query, dispatch])

  return (
    <input
      className="input"
      value={query}
      onChange={(e) =>
        dispatch(setQuery(e.target.value))
      }
      placeholder="Search movies or series..."
    />
  )
}

export { Search }