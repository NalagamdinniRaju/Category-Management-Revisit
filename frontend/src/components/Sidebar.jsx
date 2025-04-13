
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Sidebar.css"
import {
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiGrid,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiChevronLeft
} from "react-icons/fi"

const Sidebar = () => {
  const { logout, user } = useAuth()
  const location = useLocation()
  // Start expanded on larger screens, collapsed on mobile
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768)
  
  // Listen for window resize events to adjust sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  
  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }
  
  const menuItems = [
    { path: "/", name: "Dashboard", icon: <FiHome className="icon" /> },
    { path: "/orders", name: "Orders", icon: <FiShoppingCart className="icon" /> },
    { path: "/products", name: "Products", icon: <FiPackage className="icon" /> },
    { path: "/categories", name: "Categories", icon: <FiGrid className="icon" /> },
    { path: "/reports", name: "Reports", icon: <FiBarChart2 className="icon" /> },
  ]
  
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          {/* <img src="/logo.svg" alt="Revisit" /> */}
          {!collapsed && <span className="logo-text">Revisit</span>}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {collapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={isActive(item.path)}>
              <Link to={item.path}>
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
                {collapsed && <div className="tooltip">{item.name}</div>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {user && (
          <div className="user-info">
            <div className="avatar">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            {!collapsed && (
              <div className="user-details">
                <span className="user-name">{user.name || "User"}</span>
                <span className="user-role">Admin</span>
              </div>
            )}
          </div>
        )}
        <button className="logout-btn" onClick={logout}>
          <FiLogOut className="icon" />
          {!collapsed && <span>Logout</span>}
          {collapsed && <div className="tooltip">Logout</div>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar