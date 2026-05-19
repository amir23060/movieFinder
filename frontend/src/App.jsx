import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Login } from './pages/auth/login/login'
import { Signup } from './pages/auth/signUp/signUp'
import { Home } from './pages/home/home'
import { Item_details } from './pages/item_details/item_details'
import { Item } from './pages/items/items'
import { Favorites } from './pages/favorites/favorites'
import { Navbar } from './components/navbar/navbar'
import { useState } from 'react'
import { Search_modal } from './components/serach_modal/search_modal'

function App() {
   const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
     const [userId, setUserId] = useState(null)
     const closeSearch = () => { setResults([]) }
  return (

  <>
   <Navbar userId={userId} query={query} setQuery={setQuery} results={results} setResults={setResults}/>
    {
        results.length > 0 &&
        <Search_modal
          api={results}
          userId={userId}
          query={query}
          setSearchOpen={closeSearch}
        />
      }
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home/:userId' element={<Home setUserId={setUserId} />} />
      <Route path='/all/:userId/:media_type' element={<Item/>}/>
      <Route path='/favorites/:id' element={<Favorites/>}/>
    </Routes></>
  )
}

export default App