import React, { useState } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added state for confirm password

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      // Check if email, password, or confirmPassword is empty
      alert("Please fill in all fields.");
      return; // Do not proceed with submission
    }

    if (password !== confirmPassword) {
      // Check if password and confirmPassword match
      alert("Password and Confirm Password do not match.");
      return; // Do not proceed with submission
    }

    // Perform your signup logic here
    // You can make an API call or any other registration logic

    // Example: Fake signup
    alert("Sign up successful!");
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
          border: "3px solid #FFEBEB",
          borderRadius: "10px",
          maxHeight: "520px",
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
      <Footer />
    </div>
  );
}

export default SignUp;
