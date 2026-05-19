import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './home.css'
import { ItemGrid } from '../../components/item_grid/item_grid'
import dayTrendingMovies, { getTopRatedMovies, weekTrendingMovies } from '../../../api/movieApi'
import { getTopRatedSeries, weekTrendingSeries } from '../../../api/seriesApi'
import { Navbar } from '../../components/navbar/navbar'
import { Search_modal } from '../../components/serach_modal/search_modal'


export const Home = ({setUserId}) => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {

    setUserId(userId)

  }, [userId])

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [userId])

  

  if (loading) {
    return <div className="home-container"><p>Loading...</p></div>
  }

  return (
    <>
    
        <div className="home-container">
            
      
      <div className="home-content">
       <ItemGrid name={"Trending movies"} api={weekTrendingMovies} userId={userId} media_type={"movie"}/>
       <ItemGrid name={"Top rated movies"} api={getTopRatedMovies} userId={userId} media_type={"movie"}/>
       <ItemGrid name={"Trending series"} api={weekTrendingSeries} userId={userId} media_type={"tv"}/>
       <ItemGrid name={"Top rated series"} api={getTopRatedSeries} userId={userId} media_type={"tv"}/>
      </div>
    </div>
    </>
  
  )
}
