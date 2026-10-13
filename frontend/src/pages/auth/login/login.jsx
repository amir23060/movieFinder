import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../features/auth/authSlice'

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [localError, setLocalError] = useState('')
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const {loading,user,error}=useSelector(state=>state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    setLocalError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError('Please enter a valid email')
      return
    }
    const result = await dispatch(loginUser(formData))
    if(loginUser.fulfilled.match(result)){
      navigate(`/home`)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>MovieFinder</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error || localError && <div className="error-message">{error || localError}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
