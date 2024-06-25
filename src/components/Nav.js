import React from "react";
import { Link } from "react-router-dom";
import css from "./nav.module.css";

const Nav = () => {
  return (
    <div
      className={`${css.nav} ui bottom fixed massive borderless menu`}
      style={{ paddingLeft: "100px", backgroundColor: "#bbe0ff" }}
    >
      <Link to="/" className="item">
        <h1 style={{ color: "#7a7a7a" }}>Home</h1>
      </Link>
      <Link to="/registered" className="item">
        <h1 style={{ color: "#7a7a7a" }}>Registered</h1>
      </Link>
      <Link to="/history" className="item">
        <h1 style={{ color: "#7a7a7a" }}>History</h1>
      </Link>
    </div>
  );
};

export default Nav;
