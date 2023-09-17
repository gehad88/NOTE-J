import React, { Fragment } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import Category from "../Component/Category";

function Categories() {
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
