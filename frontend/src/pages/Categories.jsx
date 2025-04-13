import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://revisit-backend-jr8w.onrender.com/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Categories</h1>
        <Link to="/categories/add" className="add-category-btn">
          + Add Category
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading categories...</div>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category._id} className="category-card">
              <div className="category-image">
                <img
                  src={category.imageUrl || "/placeholder.svg"}
                  alt={category.name}
                />
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.itemCount} items</p>
              </div>
              <Link
                to={`/categories/edit/${category._id}`}
                className="edit-btn"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
