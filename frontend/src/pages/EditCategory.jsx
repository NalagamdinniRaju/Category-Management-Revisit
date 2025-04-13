import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiUploadCloud,
  FiGrid,
  FiSave,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import "../styles/CategoryForm.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    itemCount: 0,
    image: null,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://revisit-backend-jr8w.onrender.com/api/categories/${id}`,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      const category = response.data;

      setFormData({
        name: category.name,
        itemCount: category.itemCount,
        image: null,
      });

      setCurrentImage(category.imageUrl);
    } catch (error) {
      setError("Failed to fetch category details");
      toast.error("Failed to fetch category details");
      console.error(error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Create form data for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("itemCount", formData.itemCount);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const token = localStorage.getItem("token");
      await axios.put(
        `https://revisit-backend-jr8w.onrender.com/api/categories/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      toast.success("Category updated successfully");
      navigate("/categories");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return (
      <div className="error-container">
        <FiAlertCircle className="error-icon" />
        <h2>Unable to load category</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={fetchCategory} className="retry-btn">
            Try Again
          </button>
          <button onClick={() => navigate("/categories")} className="back-btn">
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-form-container">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate("/categories")}>
          ⬅️
        </button>
        <h1>
          <FiGrid className="header-icon" /> Edit Category
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-grid">
          <div className="form-left">
            <div className="form-group">
              <label htmlFor="name">
                Category Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="itemCount">Item Count</label>
              <input
                type="number"
                id="itemCount"
                name="itemCount"
                value={formData.itemCount}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
              <small className="input-help">
                Number of items in this category
              </small>
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label htmlFor="image">Category Image</label>
              <div
                className={`file-upload-area ${
                  dragActive ? "drag-active" : ""
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                />

                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Category Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setImagePreview("");
                        setFormData({ ...formData, image: null });
                      }}
                      aria-label="Remove image"
                    >
                      <FiX />
                    </button>
                  </div>
                ) : currentImage ? (
                  <div className="image-preview-container">
                    <img
                      src={currentImage}
                      alt="Current Category"
                      className="image-preview"
                    />
                    <div className="current-image-label">Current Image</div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FiUploadCloud className="upload-icon" />
                    <span className="upload-text">
                      <strong>Click to upload</strong> or drag and drop
                    </span>
                    <span className="upload-hint">
                      SVG, PNG, JPG or GIF (max. 2MB)
                    </span>
                  </div>
                )}
              </div>
              <small className="input-help">
                Leave empty to keep the current image
              </small>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/categories")}
          >
            <FiX className="btn-icon" /> Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span></span> Updating...
              </>
            ) : (
              <>
                <FiSave /> Update Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
