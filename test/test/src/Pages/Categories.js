import React, { Fragment, useEffect } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import Category from "../Component/Category";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie"; // Import Cookies

function Categories() {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Check if the user cookie is present
    const userCookie = Cookies.get("userId");
    if (!userCookie) {
      // If the user cookie is not found, redirect to the login page or another appropriate page
      navigate("/Login");
    }
  }, [navigate]);

  return (
    <Fragment>
      <Menu />
      <section className="furniture_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Your Categories</h2>
            <p>
              which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't an
            </p>
          </div>
          <div className="row">
            <Category />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Categories;
