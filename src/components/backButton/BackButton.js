import React from "react";
import { Link } from "react-router-dom";
import css from "./backButton.module.css";

const BackButton = ({ to, customClassName }) => {
  return (
    <Link to={to} className={customClassName}>
      <button
        className={`${css.button} fluid ui massive inverted grey animated button`}
      >
        <div className="visible content color-grey">Back</div>
        <div className="hidden content">
          <i className="left arrow icon"></i>
        </div>
      </button>
    </Link>
  );
};

export default BackButton;
