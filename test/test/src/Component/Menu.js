import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Menu({ ProfileImage, ShowOptions }) {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already signed in by reading a cookie.
    const userCookie = Cookies.get("user");
    if (userCookie === "signed_in") {
      setIsUserSignedIn(true);
    }
  }, []);

  // Function to handle log out
  const handleLogout = () => {
    // Remove the user cookie and update the state
    Cookies.remove("user");
    setIsUserSignedIn(false);
  };

  return (
    <Fragment>
      <header
        className="header_section long_section px-0"
        style={{ backgroundColor: "#F5EFE7" }}
      >
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <Link className="navbar-brand" to="/">
            <span>NOTE-J</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=""> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                {isUserSignedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Notes">
                        NOTES
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Categories">
                        Categories
                      </Link>
                    </li>
                  </>
                ) : null}
                <li className="nav-item">
                  <Link className="nav-link" to="/About">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="quote_btn-container">
              {isUserSignedIn ? (
                // <button className="login-btn" onClick={handleLogout}>
                //   Log Out
                // </button>
                <Link to="/" className="login-btn">
                  <span onClick={handleLogout}>Log Out</span>
                  <i
                    className={ProfileImage ?? "fa fa-user"}
                    aria-hidden="true"
                  ></i>
                </Link>
              ) : (
                <Link to="/Login" className="login-btn">
                  <span>Login</span>
                  <i
                    className={ProfileImage ?? "fa fa-user"}
                    aria-hidden="true"
                  ></i>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}

export default Menu;
