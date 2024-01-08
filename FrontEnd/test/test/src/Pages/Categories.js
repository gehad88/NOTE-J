import React, { Fragment, useEffect, useState } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import Category from "../Component/CATEGORY/Category";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AddCatPopup from "../Component/CATEGORY/AddCatPopUp";
import img3 from "../Component/Styles/Images//loupe (1).png";

function Categories() {
  console.log("Categories");
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const userIdCookie = Cookies.get("userId");

  const deleteCategory = (categoryIdToRemove) => {
    const updatedCategories = categories.filter(
      (category) => category.categoryId !== categoryIdToRemove
    );
    setCategories(updatedCategories);
  };
  const updateCategories = (editedCategory) => {
    const updatedCategories = categories.map((category) =>
      category.categoryId === editedCategory.categoryId
        ? editedCategory
        : category
    );
    setCategories(updatedCategories);
  };

  useEffect(() => {
    fetch(`https://localhost:44317/api/Category/${userIdCookie}`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [userIdCookie]);

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    setIsUserSignedIn(!!userIdCookie);
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.focus();
  };
  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setIsPopupOpen(false);

    window.location.reload();
  };

  const navigate = useNavigate();

  if (!isUserSignedIn) {
    navigate("/Login");
    return null;
  }

  const handleSearch = (ev) => {
    const value = ev.target.value;
    setSearchQuery(value);
  };

  const filteredCat = categories.filter((note) =>
    note.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <Menu />
      <section className="blog_section layout_padding">
        <div className="container">
          <div className="heading_container" style={{ marginTop: "-70px" }}>
            <h2>Categories</h2>
            <div className="search-box">
              <button className="btn-search">
                <img src={img3} style={{ width: "30px" }} alt="Search" />
              </button>
              <input
                type="text"
                className="input-search"
                placeholder="Type to Search..."
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="button-86" onClick={openPopup}>
                Add Category
              </button>
            </div>
          </div>
          <div className="row">
            {filteredCat.map((category) => (
              <div
                key={`category_${category.categoryId}`}
                className="col-md-6 col-lg-4"
              >
                <Category
                  key={`category_${category.categoryId}`}
                  category={category}
                  onDeleteCategory={deleteCategory}
                  onUpdateCategories={updateCategories}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <AddCatPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddCategory={addCategory}
      />
      <Footer />
    </Fragment>
  );
}

export default Categories;
