import React, { useState, useEffect } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();

  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 32;
  const EMAIL_MAX_LENGTH = 50;
  const USERNAME_MAX_LENGTH = 10;
  const USERNAME_MIN_LENGTH = 4;

  const displayEmailExistsAlert = () => {
    Swal.fire({
      title: "Email Already Exists",
      text: "An account with this email address already exists. Do you want to continue with this account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Use a different email",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      } else {
        setEmail("");
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      displayAlert("Please fill in all fields.");
      return;
    }

    if (
      userName.length > USERNAME_MAX_LENGTH ||
      userName.length < USERNAME_MIN_LENGTH
    ) {
      displayAlert(
        `User Name must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters.`
      );
      return;
    }

    const containsOnlyLettersAndNumbers = /^[a-zA-Z0-9]+$/.test(userName);
    if (!containsOnlyLettersAndNumbers) {
      displayAlert("User Name can only contain letters and numbers.");
      return;
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      displayAlert(`Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`);
      return;
    }

    if (password !== confirmPassword) {
      displayAlert("Password and Confirm Password do not match.");
      return;
    }

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      displayAlert(
        `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`
      );
      return;
    }

    const containsLetter = /[a-zA-Z]/.test(password);
    const containsSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);

    if (!containsLetter || !containsSpecialChar) {
      displayAlert(
        "Password must contain at least one letter and one special character."
      );
      return;
    }

    axios
      .post("https://localhost:44317/api/user/EmailExist", { email })
      .then((res) => {
        const exists = res.data;
        console.log(exists);
        if (exists) {
          // Email exists
          displayEmailExistsAlert();
        } else {
          axios
            .post("https://localhost:44317/api/user/", {
              userName,
              email,
              passwordHash: password,
            })
            .then((response) => {
              if (response.status === 201) {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "center-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                  },
                });

                Toast.fire({
                  icon: "success",
                  title: "Signed in successfully",
                });
                Cookies.set("userId", response.data.userId);

                axios
                  .post("https://localhost:44317/api/Category/", {
                    userId: parseInt(response.data.userId),
                    categoryName: "Default",
                  })
                  .then((res2) => {
                    if (res2.status === 201) {
                      return axios.post(
                        "https://localhost:44317/api/Category/",
                        {
                          userId: parseInt(response.data.userId),
                          categoryName: "University",
                        }
                      );
                    }
                    throw new Error("Failed to create 'Default' category.");
                  })
                  .then((res3) => {
                    if (res3.status === 201) {
                      return axios.post(
                        "https://localhost:44317/api/Category/",
                        {
                          userId: parseInt(response.data.userId),
                          categoryName: "Personal",
                        }
                      );
                    }
                    throw new Error("Failed to create 'University' category.");
                  })
                  .then((res4) => {
                    if (res4.status === 201) {
                      return axios.post(
                        "https://localhost:44317/api/Category/",
                        {
                          userId: parseInt(response.data.userId),
                          categoryName: "Ideas",
                        }
                      );
                    }
                    throw new Error("Failed to create 'Personal' category.");
                  })
                  .catch((error) => {
                    console.error("Category creation error:", error);
                  });

                navigate("/");
              } else {
                displayAlert("Sign up failed. Please try again later.");
              }
            })
            .catch((error) => {
              displayAlert("Sign up failed. Please try again later.");
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const displayAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isAlertVisible) {
        setIsAlertVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isAlertVisible]);

  return (
    <div>
      <Menu />
      <br />
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "60px",
          border: "3px solid #FFEBEB",
          borderRadius: "10px",
          maxHeight: "660px",
          textAlign: "center",
        }}
      >
        {isAlertVisible && (
          <div className="alert alert-danger">{alertMessage}</div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="userName" style={{ textAlign: "center" }}>
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              aria-describedby="emailHelp"
              style={{ fontSize: "14px" }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={{ textAlign: "center" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              style={{ fontSize: "14px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label
              htmlFor="exampleInputPassword1"
              style={{ textAlign: "center" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              style={{ fontSize: "14px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" style={{ textAlign: "center" }}>
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              style={{ fontSize: "14px" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                fontSize: "14px",
                width: "80px",
                backgroundColor: "#E8A0BF",
                border: "none",
              }}
            >
              Sign Up
            </button>
            <br /> <br />
            <hr />
            <p style={{ fontSize: "12px" }}>
              By signing up, you agree to our Terms, Privacy Policy, and Cookies
              Policy.
            </p>
            <p>
              Already have an account? <Link to="/Login"> Log in</Link>
            </p>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default SignUp;
