import React, { Fragment } from "react";

function Footer() {
  return (
    <Fragment>
      <br />
      <section className="info_section long_section">
        <div className="container">
          <div className="contact_nav">
            <a href="/">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span>Call : +01 123455678990</span>
            </a>
            <a href="/">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>Email : demo@gmail.com</span>
            </a>
            <a href="/">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>Location</span>
            </a>
          </div>

          <div className="info_top ">
            <div className="row ">
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="info_links">
                  <h4>QUICK LINKS</h4>
                  <div className="info_links_menu">
                    <a className="" href="index.html">
                      Home <span className="sr-only">(current)</span>
                    </a>
                    <a className="" href="about.html">
                      {" "}
                      About
                    </a>
                    <a className="" href="furniture.html">
                      Furniture
                    </a>
                    <a className="" href="blog.html">
                      Blog
                    </a>
                    <a className="" href="contact.html">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3 mx-auto">
                <div className="info_post">
                  <h5>INSTAGRAM FEEDS</h5>
                  <div className="post_box">
                    <div className="img-box">
                      <img src="images/f1.png" alt="" />
                    </div>
                    <div className="img-box">
                      <img src="images/f2.png" alt="" />
                    </div>
                    <div className="img-box">
                      <img src="images/f3.png" alt="" />
                    </div>
                    <div className="img-box">
                      <img src="images/f4.png" alt="" />
                    </div>
                    <div className="img-box">
                      <img src="images/f5.png" alt="" />
                    </div>
                    <div className="img-box">
                      <img src="images/f6.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info_form">
                  <h4>SIGN UP TO OUR NEWSLETTER</h4>
                  <form action="">
                    <input type="text" placeholder="Enter Your Email" />
                    <button type="submit">Subscribe</button>
                  </form>
                  <div className="social_box">
                    <a href="/">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="/">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="/">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="/">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer_section">
        <div className="container">
          <p>
            &copy; <span id="displayYear"></span> All Rights Reserved By
            <a href="https://html.design/">Free Html Templates</a>
          </p>
        </div>
      </footer>
    </Fragment>
  );
}

export default Footer;
