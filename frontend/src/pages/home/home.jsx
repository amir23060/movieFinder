import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './home.css'
import { ItemGrid } from '../../components/item_grid/item_grid'
import dayTrendingMovies, { getTopRatedMovies, weekTrendingMovies } from '../../../api/movieApi'
import { getTopRatedSeries, weekTrendingSeries } from '../../../api/seriesApi'
import { Navbar } from '../../components/navbar/navbar'
import { Search_modal } from '../../components/serach_modal/search_modal'
import { useAuth } from '../../Context/AuthContext'


export const Home = () => {
  
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const {user,setUser}=useAuth()

  useEffect(() => {
    // Get user from localStorage
    
    if (user) {
      setUser(user)
    }
    setLoading(false)
  }, [user._id])

  

  if (loading) {
    return <div className="home-container"><p>Loading...</p></div>
  }

  return (
    <>
    
        <div className="home-container">
            
      
      <div className="home-content">
       <ItemGrid name={"Trending movies"} api={weekTrendingMovies} media_type={"movie"}/>
       <ItemGrid name={"Top rated movies"} api={getTopRatedMovies} media_type={"movie"}/>
       <ItemGrid name={"Trending series"} api={weekTrendingSeries}  media_type={"tv"}/>
       <ItemGrid name={"Top rated series"} api={getTopRatedSeries}  media_type={"tv"}/>
      </div>
    </div>
    </>
  
  )
}
