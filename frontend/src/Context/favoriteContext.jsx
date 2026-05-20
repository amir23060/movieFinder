import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addToFavorites, getAllFavorites, removeFromfavorites } from "../api/authApi";

const FavoriteContext = createContext()

function FavoriteProvider({children}){
    const {user}=useAuth()
const [allFavorites,setAllFavorites] = useState([])
const loadFavorites = async () => {
  if (!user._id) return
  const userId=user?._id
  const data = await getAllFavorites(userId)
  setAllFavorites(data)
}
const addToFavorite = async ({id,title,media_type,poster}) => {
  try {
    const userId = user?._id
    await addToFavorites(userId,{id,title,media_type,poster})
    await loadFavorites()
  } catch (err) {
    console.log(err)
  }
}
const removeFavorite = async (id) => {
  try {
    const userId = user?._id
    await removeFromfavorites(userId,id)

    await loadFavorites()
  } catch (err) {
    console.log(err)
  }
}
return(<>
<FavoriteContext.Provider value={{allFavorites,loadFavorites,addToFavorite,removeFavorite}}>
    {children}
</FavoriteContext.Provider>
</>)

}
function useFavorite() {
  return useContext(FavoriteContext)
}
export {FavoriteProvider,useFavorite}