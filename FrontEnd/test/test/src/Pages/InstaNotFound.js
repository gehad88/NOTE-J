import React from "react";
import { Link } from "react-router-dom";

function InstaNotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - I Hate Instagram!</h2>
        </div>
        <Link to="/">Go To Homepage</Link>
      </div>
    </div>
  );
}

export default InstaNotFound;
