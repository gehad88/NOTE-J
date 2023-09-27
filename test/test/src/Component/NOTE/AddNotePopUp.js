import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "../Styles/AddButton.css";
import "../Styles/PopUp.css";

const AddNotePopup = ({ isOpen, onClose, onAddNote }) => {
  console.log("AddNotePopup");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const userIdCookie = Cookies.get("userId");

  ////////////////////////
  const MAX_TITLE_LENGTH = 24;
  const MAX_CONTENT_LENGTH = 5000;

  const currentDate = new Date();
  currentDate.setUTCHours(currentDate.getUTCHours() + 1);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getUTCHours()).padStart(2, "0");
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  useEffect(() => {
    const fetchData = () => {
      if (userIdCookie) {
        axios
          .post(
            "https://localhost:44317/api/category/GETDEFAULTCATEGORY",
            JSON.stringify({ userId: parseInt(userIdCookie) }),
            {
              headers: {
                "Content-Type": "application/json", // Specify JSON content type
              },
            }
          )
          .then((response) => {
            setCategory(response.data);
          })
          .catch((error) => {
            console.error("Error with AXIOS", userIdCookie);
          });
      }
    };

    fetchData(); // Call the function when userIdCookie is available
  }, [userIdCookie]);

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
    if (selectedCategoryId !== "") {
      setCategory(selectedCategoryId);
    }
  };

  const handleSubmit = () => {
    const newTitle = title.length === 0 ? "No Title" : title;
    const newContent = content.length === 0 ? "Empty" : content;
    const newNoteData = {
      userId: parseInt(userIdCookie),
      categoryId: parseInt(category),
      title: newTitle,
      content: newContent,
      image,
      createdAt: formattedDate,
    };

    axios
      .post("https://localhost:44317/api/Note/", newNoteData)
      .then((response) => {
        console.log("Note added successfully:", response.data);
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
    fetch(`https://localhost:44317/api/Category/${userIdCookie}`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [userIdCookie]);

  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
      {(close) => (
        <div className="popup">
          <div className="message-box custom-message-box">
            <div className="input-row">
              <div className="input-half">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="input-field"
                  maxLength={MAX_TITLE_LENGTH}
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

            <div className="input-group">
              <label>Content</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                className="input-field content-textarea"
                maxLength={MAX_CONTENT_LENGTH}
              />
              <div className="char-count">
                {content.length}/{MAX_CONTENT_LENGTH}
              </div>
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
              <button onClick={handleSubmit} className="button-1">
                Add Note
              </button>
              <button
                onClick={close}
                className="btn btn-secondary"
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
            <br />
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddNotePopup;
