import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NoteDetails = ({ isOpen, onClose, note }) => {
  console.log("NoteDetails");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const userIdCookie = Cookies.get("userId");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);
  };

  const handleSubmit = () => {
    axios
      .put("https://localhost:44317/api/Note/", {
        userId: parseInt(userIdCookie),
        categoryId: parseInt(category),
        title,
        content,
        image,
      })
      .then((response) => {
        console.log("Note added successfully:", response.data);
        // Reset form fields and close the popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1600,
        });
        setTitle("");
        setContent("");
        setImage(null);
        setCategory("");
        onClose();
      })
      .catch((error) => {
        console.error("Error adding note:", error);
        console.log(userIdCookie, category, title, content, image);
      });
  };

  useEffect(() => {
    fetch("https://localhost:44317/api/Category/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
      {(close) => (
        <div className="popup">
          <div className="message-box">
            <div className="input-row">
              <div className="input-half">
                <label>Title</label>
                <input
                  type="text"
                  value={note.title}
                  onChange={handleTitleChange}
                  className="input-field"
                />
              </div>
              <div className="input-half">
                <label>Category</label>
                <select
                  value={note.categoryId}
                  onChange={(e) => {
                    note.categoryId = e.target.value;
                    handleCategoryChange(e);
                  }}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-half">
                <label>Date/Time</label>
                <input
                  type="text"
                  value={note.createdAt.slice(0, 16)}
                  readOnly
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Content</label>
            <textarea
              value={note.content}
              onChange={handleContentChange}
              className="input-field content-textarea"
            />
          </div>

          <div className="input-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field"
            />
          </div>
          <br />

          <div className="button-group">
            <button onClick={handleSubmit} className="btn btn-primary">
              Edit Note
            </button>
            <button onClick={close} className="btn btn-secondary">
              Cancel
            </button>
          </div>
          <br />
        </div>
      )}
    </Popup>
  );
};

export default NoteDetails;
