import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const AddNotePopup = ({ isOpen, onClose, onAddNote }) => {
  console.log("AddNotePopup");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const userIdCookie = Cookies.get("userId");

  const currentDate = new Date();
  currentDate.setUTCHours(currentDate.getUTCHours() + 1); // Adjust for Egypt's UTC+2 offset

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getUTCHours()).padStart(2, "0");
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

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
    const categoryIdToSend = category ? parseInt(category) : 61; // Replace 1 with your desired default category ID

    const newNoteData = {
      userId: parseInt(userIdCookie),
      categoryId: categoryIdToSend,
      title,
      content,
      image,
      createdAt: formattedDate,
    };

    axios
      .post("https://localhost:44317/api/Note/", newNoteData)
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
        onAddNote(newNoteData);
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
                  value={title}
                  onChange={handleTitleChange}
                  className="input-field"
                />
              </div>
              <div className="input-half">
                <label>Category</label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
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
                  value={formattedDate.slice(0, 16)}
                  readOnly
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Content</label>
            <textarea
              value={content}
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
              Add Note
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

export default AddNotePopup;
