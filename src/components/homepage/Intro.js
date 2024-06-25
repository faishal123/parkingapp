import React from "react";
import css from "./homepage.module.css";

const Intro = (props) => {
  return (
    <div className="color-grey">
      <h1 style={{ fontSize: "3em" }}>{props.tulisan.judul}</h1>
      <div className={css.introTextContainer}>
        <p>{props.tulisan.isi}</p>
        <img
          alt="gambar palang"
          src={props.gambarPalang}
          className="ui centered medium image"
          style={{ paddingTop: "25px" }}
        />
      </div>
    </div>
  );
};

export default Intro;
