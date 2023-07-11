import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import List from "./List";
import gambarRegistered from "../../images/registered.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import { useMobile } from "../../utils/common";
import css from "./registered.module.css";
import BackButton from "../backButton/BackButton";
import { getRecords } from "../../utils/airtable";

const Registered = (props) => {
  const isMobile = useMobile();
  const [isLoading, setIsLoading] = useState(false);
  const getFullRecords = (customCallback) => {
    setIsLoading(true);
    getRecords()
      .then((response) => {
        if (typeof customCallback === "function") {
          customCallback(response);
        } else {
          props.fetchUsers(response?.map((r) => r.fields));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getFullRecords();
  }, []);

  const onSearchSubmit = (term) => {
    const searchTermTrimmed = term.trim();
    if (searchTermTrimmed) {
      getFullRecords((response) => {
        props.fetchUsers(
          response?.reduce((a, c) => {
            if (c?.fields?.name?.toLowerCase()?.includes(searchTermTrimmed)) {
              return [...a, c?.fields];
            }
            return a;
          }, [])
        );
      });
    } else {
      getFullRecords();
    }
  };

  return (
    <div className={`${css.registeredContainer}`}>
      <div>
        <div>
          <div className={`header`}>
            <img alt="gambar registered" src={gambarRegistered} />
            <h1>Registered Vehicle</h1>
          </div>
          <br></br>
          <SearchBar onSubmit={onSearchSubmit} />
          <br></br>
          <Link to="/insert">
            <button className={`${css.button} fluid ui button`}>
              <h3 className="color-grey">
                Add New Vehicle
                <i className={`${css.icon} plus big icon`}></i>
              </h3>
            </button>
          </Link>
          <br></br>
          <Link to="/delete">
            <button className={`${css.button} fluid ui button`}>
              <h3 className="color-grey">
                Delete a Vehicle
                <i className={`${css.icon} trash alternate big icon`}></i>
              </h3>
            </button>
          </Link>
        </div>
        <div>
          <List data={props.users} isLoading={isLoading} />
        </div>
        {isMobile && <BackButton to="/" />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  fetchUsers: fetchUsers,
})(Registered);
