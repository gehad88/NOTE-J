import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Fragment>
      <br />
      <section className="info_section long_section">
        <div className="container">
          <div className="contact_nav">
            <a href="/">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span>Call : +01011111111</span>
            </a>
            <a href="/">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>Email : gehadomar007@gmail.com</span>
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
                    <Link className="" to="/About">
                      About
                    </Link>
                    <Link className="" to="/Contact">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="info_form">
                  <h4>SIGN UP TO OUR NEWSLETTER</h4>
                  <form action="">
                    <button type="submit">Subscribe</button>
                  </form>
                  <div className="social_box">
                    <a
                      href="https://www.facebook.com/profile.php?id=100094488901583"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/gehad-omar-993b151a3/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="/InstaNotFound">
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
            <a href="/">Free Html Templates</a>
          </p>
        </div>
      </footer>
    </Fragment>
  );
}

export default Footer;
