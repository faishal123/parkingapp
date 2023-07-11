import React from "react";
import css from "./background.module.css";

const Background = ({ children }) => {
  return <div className={css.background}>{children}</div>;
};

export default Background;
