import React, { Fragment } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

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
                          For All Your <br />
                          Furniture Needs
                        </h1>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Minus quidem maiores perspiciatis, illo maxime
                          voluptatem a itaque suscipit.
                        </p>
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
                        <img src="images/slider-img.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-box">
                        <h1>
                          For All Your <br />
                          Furniture Needs
                        </h1>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Minus quidem maiores perspiciatis, illo maxime
                          voluptatem a itaque suscipit.
                        </p>
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
                        <img src="images/slider-img.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-box">
                        <h1>
                          For All Your <br />
                          Furniture Needs
                        </h1>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Minus quidem maiores perspiciatis, illo maxime
                          voluptatem a itaque suscipit.
                        </p>
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
                        <img src="images/slider-img.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ol className="carousel-indicators">
              <li
                data-target="#customCarousel"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#customCarousel" data-slide-to="1"></li>
              <li data-target="#customCarousel" data-slide-to="2"></li>
            </ol>
          </div>
        </section>
      </div>

      <section className="about_section layout_padding long_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src="images/about-img.png" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti dolorem eum consequuntur ipsam repellat dolor soluta
                  aliquid laborum, eius odit consectetur vel quasi in quidem,
                  eveniet ab est corporis tempore.
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
            <h2>Testimonial</h2>
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
