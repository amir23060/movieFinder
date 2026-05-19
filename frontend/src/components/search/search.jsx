import { useEffect, useState } from "react"
import { multiSearch } from "../../../api/movieApi"
import { Search_modal } from "../serach_modal/search_modal"
import "./search.css"
function Search({ userId,query,setQuery,results,setResults }) {


 useEffect(() => {

  if (!query ||!query.trim()) {

    setResults([])

    return

  }

  multiSearch(query).then((res) => {

    setResults(res || [])

  })

}, [query])

  return (
    <>
      

      <input
      className="input"
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies or series..."
      />
    </>
  )
}

export { Search }