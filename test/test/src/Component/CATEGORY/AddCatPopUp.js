import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "../Styles/AddButton.css";

const AddCatPopup = ({ isOpen, onClose, onAddCategory }) => {
  console.log("AddNotePopup");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(
    "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  );
  const [imageFile, setImageFile] = useState("");
  const userIdCookie = Cookies.get("userId");
  const defaultImage =
    "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(newImageFile);
        setImageSrc(x.target.result);
      };
      reader.readAsDataURL(newImageFile);
    } else {
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageSrc(defaultImage);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Swal.fire({
        icon: "error",
        title: "Title cannot be empty",
      });
      return;
    }
    const newCatData = {
      userId: parseInt(userIdCookie),
      categoryName: title,
      categoryImage: imageSrc,
      imgaeFile: imageFile,
    };

    const formData = new FormData();
    formData.append("userId", parseInt(userIdCookie));
    formData.append("categoryName", title);
    formData.append("categoryImage", imageSrc);
    formData.append("imageFile", imageFile);

    axios
      .post("https://localhost:44317/api/Category/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
              <img
                alt="h"
                src={imageSrc}
                style={{ width: "50px", height: "50px" }}
              />
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
            <button onClick={handleSubmit} className="button-1">
              Add Category
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
      )}
    </Popup>
  );
};

export default AddCatPopup;
