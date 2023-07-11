import React from "react";
import css from "./registered.module.css";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <div className={`ui raised very padded ${css.registeredListDataContainer}`}>
      {props?.isLoading ? (
        <div className="ui active centered inline massive loader"></div>
      ) : props?.data?.length ? (
        <div className="ui middle aligned divided very relaxed list">
          <div className="item">
            <div className="right floated content">
              <h3>License Plate</h3>
            </div>
            <div className="content">
              <h3>Name</h3>
            </div>
          </div>
          {props.data.map((item) => (
            <div className="item" key={item.id}>
              <div className="middle aligned right floated content">
                <Link to={`/profile/${item.id}`}>
                  <i className="chevron right icon"></i>
                </Link>
              </div>
              <div className="middle aligned right floated content">
                {item.license}
              </div>
              <div className="content">{item.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <h3>
          I'm sorry we couldn't find any result matching your search term,
          please try something else.
        </h3>
      )}
    </div>
  );
};

export default List;
