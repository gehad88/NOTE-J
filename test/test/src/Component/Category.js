import React from "react";

function Category() {
  return (
    <>
      <div className="col-md-6 col-lg-4">
        <div className="box">
          <div className="img-box">
            <img src="images/f2.png" alt="" />
          </div>
          <div className="detail-box">
            <h5>Double Bed Design</h5>
            <div className="price_box">
              <h6 className="price_heading">
                <span>$</span> 200.00
              </h6>
              <a href="/">Buy Now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
