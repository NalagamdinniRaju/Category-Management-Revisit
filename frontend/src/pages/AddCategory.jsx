import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiUploadCloud,
  FiGrid,
  FiSave,
  FiX,
} from "react-icons/fi";
import "../styles/CategoryForm.css";

const AddCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    itemCount: 0,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (!formData.name || !formData.image) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Create form data for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("itemCount", formData.itemCount);
      data.append("image", formData.image);

      const token = localStorage.getItem("token");
      await axios.post(
        "https://revisit-backend-jr8w.onrender.com/api/categories",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      toast.success("Category added successfully");
      navigate("/categories");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form-container">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate("/categories")}>
          ⬅️
        </button>
        <h1>
          <FiGrid className="header-icon" /> Add New Category
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
                Optional: Number of items in this category
              </small>
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label htmlFor="image">
                Category Image
                <span className="required">*</span>
              </label>
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
                  required
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
                <span></span> Adding...
              </>
            ) : (
              <>
                <FiSave /> Add Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
