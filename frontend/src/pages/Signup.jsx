

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi"
import "../styles/Auth.css"

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    const success = await signup(formData.name, formData.email, formData.password)
    setLoading(false)
    
    if (success) navigate("/login")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-container">
            <span className="logo-icon">R</span>
            <span className="logo-text">Revisit.</span>
          </div>
          <h1>Create an Account</h1>
          <p className="auth-subtitle">Join us to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-group">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                placeholder="Full Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <FiMail className="input-icon" />
              <input 
                type="email" 
                placeholder="Email Address" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Sign Up <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login now</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup