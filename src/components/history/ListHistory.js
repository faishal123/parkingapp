import React from "react";
import css from "./history.module.css";
import { formatDate } from "../../utils/airtable";

function showAction(item) {
  if (item === "MASUK") {
    return <div className="ui green basic label">Masuk</div>;
  } else {
    return <div className="ui red basic label">Keluar</div>;
  }
}

const ListHistory = ({ items, isLoading }) => {
  return (
    <div
      className={`ui raised very padded segment ${css.listHistoryContainer}`}
    >
      <div className="ui middle aligned divided very relaxed list">
        {isLoading ? (
          <div className="ui active centered inline massive loader"></div>
        ) : items?.length > 0 ? (
          items.map((item) => (
            <div className="item" key={item[0]}>
              <div className="right floated content">{showAction(item[2])}</div>
              <div className="middle aligned content">
                <h4>{item[1]}</h4>
              </div>
              <div className="middle aligned content">
                {formatDate(item[3])}
              </div>
            </div>
          ))
        ) : (
          <div> 
            <h4>
              I'm sorry we couldn't find any result matching your search term,
              please try something else.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHistory;
