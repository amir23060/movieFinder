import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { multiSearch } from "../../api/movieApi"



const SearchContext =
  createContext()

function SearchProvider({
  children
}) {
  const [query, setQuery] =
    useState("")

  const [results, setResults] =
    useState([])

  const [
    searchOpen,
    setSearchOpen
  ] = useState(false)

  useEffect(() => {
    if (!query?.trim()) {
      setResults([])
      setSearchOpen(false)
      return
    }

    multiSearch(query)
      .then((res) => {
        setResults(res || [])
        setSearchOpen(true)
      })
  }, [query])

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        searchOpen,
        setSearchOpen
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

function useSearch() {
  return useContext(SearchContext)
}

export {
  SearchProvider,
  useSearch
}