import React, { useEffect, useState } from "react";
import axios from "axios";
import ListHistory from "./ListHistory";
import SearchBarHistory from "./SearchBarHistory";
import gambarHistory from "../../images/history.png";
import { getRecords } from "../../utils/airtable";
import { connect } from "react-redux";
import css from "./history.module.css";
import { useMobile } from "../../utils/common";
import BackButton from "../backButton/BackButton";
import { fetchHistory } from "../../actions";

const History = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const getFullHistory = () => {
    setIsLoading(true);
    getRecords("accessHistory")
      .then((histories) => {
        props.fetchHistory(
          histories?.reduce((a, c) => {
            return [
              ...a,
              [
                c?.fields?.id,
                c?.fields?.license,
                c?.fields?.action,
                c?.fields?.time,
                c?.fields?.name,
              ],
            ];
          }, [])
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFormSubmit = (term) => {
    if (term?.trim()) {
      setIsLoading(true);
      getRecords("parkingdata")
        .then((response) => {
          const searchedLicense = response?.reduce((a, c) => {
            if (c?.fields?.name?.toLowerCase()?.includes(term)) {
              return [...a, c?.fields?.license];
            }
            return a;
          }, []);
          props.fetchHistory(
            props.history?.reduce((a, c) => {
              if (searchedLicense?.includes(c?.[1]?.[0])) {
                return [...a, c];
              }
              return a;
            }, [])
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getFullHistory();
    }
  };

  useEffect(() => {
    getFullHistory();
  }, []);

  return (
    <div className={`${css.historyContainer}`}>
      <div className={`${css.historyLayout}`}>
        <div>
          <div className={`header`}>
            <img alt="gambar history" src={gambarHistory} />
            <h1>Access History</h1>
          </div>
          <br></br>
          <SearchBarHistory onSubmit={onFormSubmit} />
        </div>
        <ListHistory items={props.history} isLoading={isLoading} />
        <BackButton to="/" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  fetchHistory: fetchHistory,
})(History);
