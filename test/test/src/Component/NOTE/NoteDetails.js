import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NoteDetails = ({ isOpen, onClose, note, onUpdateNote }) => {
  console.log("NoteDetails");
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(note.categoryId); // Initialize category with the current category
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
    // Only update the category state if a valid category is selected (not an empty string)
    if (selectedCategoryId !== "") {
      setCategory(selectedCategoryId);
    }
  };

  console.log("Note ID before PUT request:", note.noteId);

  const handleSubmit = () => {
    const categoryIdToSend = category ? parseInt(category) : 61;

    axios
      .put(`https://localhost:44317/api/Note/${note.noteId}`, {
        noteId: note.noteId,
        userId: parseInt(userIdCookie),
        categoryId: categoryIdToSend,
        title,
        createdAt: note.createdAt,
        content,
        image,
      })
      .then((response) => {
        console.log("Note edited successfully:", response.data);

        const updatedNote = {
          ...note,
          title,
          content,
          categoryId: categoryIdToSend,
        };

        onUpdateNote(updatedNote);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 700,
        });

        onClose();
      })
      .catch((error) => {
        console.error("Error editing note:", error);
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
                  value={category} // Use the updated category state
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
