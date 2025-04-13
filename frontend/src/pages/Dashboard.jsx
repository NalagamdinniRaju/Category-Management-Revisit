import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaBoxOpen, FaListAlt, FaShoppingCart } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://revisit-backend-jr8w.onrender.com/api/dashboard/stats"
      );
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="welcome-message">
          Welcome back, {user?.name || "Admin"}!
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard data...</div>
      ) : (
        <>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon categories-icon">
                <FaListAlt size={30} />
              </div>
              <div className="stat-content">
                <h3>Categories</h3>
                <p className="stat-value">{stats.totalCategories}</p>
                <Link to="/categories" className="stat-link">
                  View all
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon products-icon">
                <FaBoxOpen size={30} />
              </div>
              <div className="stat-content">
                <h3>Products</h3>
                <p className="stat-value">{stats.totalProducts}</p>
                <Link to="/products" className="stat-link">
                  View all
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orders-icon">
                <FaShoppingCart size={30} />
              </div>
              <div className="stat-content">
                <h3>Orders</h3>
                <p className="stat-value">{stats.totalOrders}</p>
                <Link to="/orders" className="stat-link">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/categories/add" className="action-btn">
                Add New Category
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
