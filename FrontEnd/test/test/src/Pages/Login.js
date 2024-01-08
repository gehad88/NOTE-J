import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Email.trim() === "" || Password.trim() === "") {
      alert("Please fill in all fields.");

      return;
    }

    axios
      .post("https://localhost:44317/api/user/Login/", {
        Email,
        Password,
      })
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("userId", res.data.userId);
          const Toast = Swal.mixin({
            toast: true,
            position: "center-end",
            showConfirmButton: false,
            timer: 2000,
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
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This account does not exist, try again ?!",
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <Menu />
      <br />
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "60px",
          border: "3px solid #F2BED1",
          borderRadius: "10px",
          maxHeight: "420px",
          textAlign: "center",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{ textAlign: "center" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ fontSize: "14px" }}
              value={Email}
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
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
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
              Login
            </button>
            <br /> <br />
            <hr />
            <p>
              Don't have an account? <Link to="/SignUp"> Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
