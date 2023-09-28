import React, { Fragment } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";
import img1 from "../Component/Styles/Images/n1.jpg";
import img2 from "../Component/Styles/Images/aboutus.jpg";
import img from "../Component/Styles/Images/108103.jpg";

function Home() {
  return (
    <Fragment>
      <div className="hero_area">
        <Menu />
        <section className="slider_section long_section">
          <div
            id="customCarousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-box">
                        <h1>
                          Express <br />
                          What You Think
                        </h1>
                        <p>Now You Can add your notes , categories</p>
                        <div className="btn-box">
                          <Link to="/Contact" className="btn1">
                            Contact Us
                          </Link>
                          <Link to="/About" className="btn2">
                            About Us
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="img-box">
                        <img src={img1} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="about_section layout_padding long_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={img2} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p>
                  This is my first porject to try to apply the basics of Backend
                  (using .NET) and basics of Frontend (using React JS)
                </p>
                <a href="/">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container">
            <h2>Team member</h2>
          </div>
          <div
            id="carouselExample2Controls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md-11 col-lg-10 mx-auto">
                    <div className="box">
                      <div className="img-box">
                        <img src={img} alt="" />
                      </div>
                      <div className="detail-box">
                        <div className="name">
                          <i
                            className="fa fa-quote-left"
                            aria-hidden="true"
                          ></i>
                          <h6>Gehad Omar</h6>
                        </div>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable cIt is a long established
                          fact that a reader will be distracted by the readable
                          c
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-11 col-lg-10 mx-auto">
                    <div className="box">
                      <div className="img-box">
                        <img src="images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <div className="name">
                          <i
                            className="fa fa-quote-left"
                            aria-hidden="true"
                          ></i>
                          <h6>Siaalya</h6>
                        </div>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable cIt is a long established
                          fact that a reader will be distracted by the readable
                          c
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-11 col-lg-10 mx-auto">
                    <div className="box">
                      <div className="img-box">
                        <img src="images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <div className="name">
                          <i
                            className="fa fa-quote-left"
                            aria-hidden="true"
                          ></i>
                          <h6>Siaalya</h6>
                        </div>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable cIt is a long established
                          fact that a reader will be distracted by the readable
                          c
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel_btn-container">
              <a
                className="carousel-control-prev"
                href="#carouselExample2Controls"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExample2Controls"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_section  long_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="form_container">
                <div className="heading_container">
                  <h2>Contact Us</h2>
                </div>
                <form action="">
                  <div>
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div>
                    <input type="text" placeholder="Phone Number" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="message-box"
                      placeholder="Message"
                    />
                  </div>
                  <div className="btn_box">
                    <button>SEND</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <div className="map">
                  <div id="googleMap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Home;
