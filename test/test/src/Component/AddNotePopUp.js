import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

const AddNotePopup = ({ isOpen, onClose, onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null); // Initialize as null

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
    // Get the selected category ID from the event's target value
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);
  };

  const handleSubmit = () => {
    // Create a new note object

    // Send a POST request to add the new note to the server
    axios
      .post("https://localhost:44317/api/Note/", {
        userId: 1,
        categoryId: parseInt(category),
        title,
        content,
        image,
      })
      .then((response) => {
        console.log("Note added successfully:", response.data);
        // Call the onAddNote function to update the UI with the new note
        console.log(1, category, title, content, image);
        // Reset form fields and close the popup
        setTitle("");
        setContent("");
        setImage(null);
        setCategory("");
        onClose();
      })
      .catch((error) => {
        console.error("Error adding note:", error);
        console.log(1, category, title, content, image);

        // Handle any errors that occur during the POST request
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
          <h2>Add New Note</h2>
          <div className="message-box">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="input-field"
            />
          </div>

          <div className="message-box">
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

          <div className="input-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={handleContentChange}
              className="input-field"
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
