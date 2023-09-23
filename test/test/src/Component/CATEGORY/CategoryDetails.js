import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const CategoryDetails = ({ isOpen, onClose, category, onUpdateCat }) => {
  console.log("CategoryDetails ok ", category);
  const [title, setTitle] = useState(category.categoryName);
  const [image, setImage] = useState(null);
  const userIdCookie = Cookies.get("userId");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  console.log("Category ID before PUT request:", category.categoryId);

  const handleSubmit = () => {
    axios
      .put(`https://localhost:44317/api/Category/${category.categoryId}`, {
        categoryId: category.categoryId,
        userId: parseInt(userIdCookie),
        categoryName: title,
        image: image,
      })
      .then((response) => {
        console.log("category edited successfully:", response.data);

        const updatedCategory = {
          ...category,
          categoryName: title, // Update only the field that changed
          image, // Update the image as well, if necessary
        };

        // Update the state in the parent component immediately
        onUpdateCat(updatedCategory);

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
        console.error("Error editing category:", error);
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
              Edit Category
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

export default CategoryDetails;
