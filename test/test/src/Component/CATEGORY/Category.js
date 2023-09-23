import React, { useEffect, useState } from "react";
import "../Styles/Trash.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CategoryDetails from "./CategoryDetails.js";
import "../Styles/ReadMoreButton.css";
import "../Styles/ViewNotesButton.css";

function Category({ category, onDeleteCategory, onUpdateCategories }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    setIsUserSignedIn(!!userIdCookie);
  }, []);

  const navigate = useNavigate();

  if (!isUserSignedIn) {
    navigate("/NotFound");
    return null;
  }

  const deleteCategory = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`https://localhost:44317/api/Category/${category.categoryId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            // Call the onDeleteNote callback with the noteId to remove it from the state
            onDeleteCategory(category.categoryId);
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
      }
    });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.activeElement.blur(); // Remove focus from the currently focused element
  };

  return (
    <div className="box">
      <div className="img-box">
        <img src="images/b1.jpg" alt="" />
      </div>
      <div className="detail-box">
        <h5>{category.categoryName}</h5>
        <div className="button-container">
          <button className="button-5" onClick={openPopup}>
            Edit Category
          </button>
          <button
            onClick={deleteCategory}
            style={{ border: "none" }}
            className="trash"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="40"
              style={{ fill: "red" }}
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
          <button className="button-89">55 Notes</button>
        </div>
        <CategoryDetails
          category={category}
          isOpen={isPopupOpen}
          onClose={closePopup}
          onUpdateCat={onUpdateCategories}
        />
      </div>
    </div>
  );
}

export default Category;
