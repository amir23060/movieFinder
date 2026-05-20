import { Routes, Route } from "react-router-dom"
import "./App.css"

import { Login } from "./pages/auth/login/login"
import { Signup } from "./pages/auth/signUp/signUp"
import { Home } from "./pages/home/home"
import { Item } from "./pages/items/items"
import { Favorites } from "./pages/favorites/favorites"
import { Navbar } from "./components/navbar/navbar"
import { Search_modal } from "./components/serach_modal/search_modal"

import { useSearch } from "./Context/searchContext"

function App() {
  const {
    results,
    searchOpen
  } = useSearch()

  return (
    <>
      <Navbar />

      {searchOpen && (
        <Search_modal api={results} />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/all/:userId/:media_type" element={<Item />} />
        <Route path="/favorites/:id" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App