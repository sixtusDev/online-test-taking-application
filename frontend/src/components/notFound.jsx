import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h2 className="not-found__heading">Sorry, Page Not Found</h2>
        <img className="not-found__image" src="../stem.jpg" alt="STEM" />
        <p className="not-found__text">
          The page you requested cound not be found. Click on the button bellow
          to access the home page and fill in your details in order to start
          your exam. Thank you
        </p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="btn-primary">Home</button>
        </Link>
      </div>
    );
  }
}

export default NotFound;
