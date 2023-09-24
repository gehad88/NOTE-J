import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const AddCatPopup = ({ isOpen, onClose, onAddCategory }) => {
  console.log("AddNotePopup");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const userIdCookie = Cookies.get("userId");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    const newCatData = {
      userId: parseInt(userIdCookie),
      categoryName: title,
      image,
    };

    axios
      .post("https://localhost:44317/api/Category/", newCatData)
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
        setImage(null);
        onClose();
        onAddCategory(newCatData);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
        console.log(userIdCookie, title, image);
      });
  };

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
            <button onClick={handleSubmit} className="btn btn-primary">
              Add Category
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

export default AddCatPopup;
