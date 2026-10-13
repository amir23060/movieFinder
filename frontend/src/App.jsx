import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Login } from './pages/auth/login/login'
import { Signup } from './pages/auth/signUp/signUp'
import { Home } from './pages/home/home'
import { Item_details } from './pages/item_details/item_details'
import { Item } from './pages/items/items'
import { Favorites } from './pages/favorites/favorites'
import { Navbar } from './components/navbar/navbar'
import { useEffect, useState } from 'react'
import { Search_modal } from './components/serach_modal/search_modal'
import { useDispatch, useSelector } from 'react-redux'
import { allUserFavorites } from './features/favorites/favoritesSlice'
import { Item_modal } from './components/item_modal/item_modal'

function App() {
const { results, isOpen } = useSelector(

  state => state.search

)
    const {user}= useSelector(state => state.auth)
    const dispatch = useDispatch()
     useEffect(() => {

  if (user?._id) {

    dispatch(allUserFavorites())

  }

}, [user, dispatch])

     const closeSearch = () => { setResults([]) }
  return (

  <>
   <Navbar />
   {results.length > 0 && (

  <Search_modal />

)}

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/all/:userId/:media_type' element={<Item/>}/>
      <Route path='/favorites' element={<Favorites/>}/>
    </Routes></>
  )
}

export default App