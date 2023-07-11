import React, { useState } from "react";
import { connect } from "react-redux";
import { getRecords } from "../utils/airtable";
import { fetchHistory, fetchUser } from "../actions";
import { useMobile } from "../utils/common";
import BackButton from "./backButton/BackButton";
import css from "./profile.module.css";
import { formatDate } from "../utils/airtable";

function showAction(item) {
  if (item === "MASUK") {
    return <div className="ui green basic label">Masuk</div>;
  } else if (item === "KELUAR") {
    return <div className="ui red basic label">Keluar</div>;
  }
}

const Profile = (props) => {
  const isMobile = useMobile();
  const [profileLoading, setProfileLoading] = useState(false);
  const [accessHistoryLoading, setAccessHistoryLoading] = useState(false);
  console.log(isMobile);
  return (
    <ProfileComponent
      {...props}
      isMobile={isMobile}
      profileLoading={profileLoading}
      accessHistoryLoading={accessHistoryLoading}
      setProfileLoading={setProfileLoading}
      setAccessHistoryLoading={setAccessHistoryLoading}
    />
  );
};

class ProfileComponent extends React.Component {
  componentDidMount() {
    const paramsId = Number(this.props.match.params.id);
    const { setProfileLoading, setAccessHistoryLoading } = this.props;
    setProfileLoading(true);
    getRecords()
      .then((response) => {
        const currentUser = response?.filter(
          (r) => r?.fields?.id === paramsId
        )?.[0]?.fields;
        this.props.fetchUser([
          [
            currentUser?.id,
            currentUser?.name,
            currentUser?.license,
            currentUser?.email,
            currentUser?.phone,
          ],
        ]);
        setAccessHistoryLoading(true);
        getRecords("accessHistory")
          .then((histories) => {
            this.props.fetchHistory(
              histories?.reduce((a, c) => {
                if (c?.fields?.license?.[0] === currentUser?.license) {
                  return [
                    ...a,
                    [
                      c?.fields?.id,
                      c?.fields?.license,
                      c?.fields?.action,
                      c?.fields?.time,
                    ],
                  ];
                }
                return a;
              }, [])
            );
          })
          .finally(() => {
            setAccessHistoryLoading(false);
          });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setProfileLoading(false);
      });
  }

  render() {
    const { history, profileLoading, accessHistoryLoading } = this.props;

    return (
      <div className={`${css.profilePageContainer}`}>
        <div className={css.widthLimitContainer}>
          <div className={`${css.profileContainer} ui segment`}>
            {!profileLoading ? (
              <>
                <div className={css.profileDataContainer}>
                  <h1 className="ui header color-grey">
                    {this.props.user.name}
                  </h1>
                  <div className="ui section divider"></div>
                  <div className="ui grid">
                    <div className="eight wide column">
                      <h4 className="ui header color-grey">License Plate :</h4>
                      <h4 className="ui header color-grey">Email :</h4>
                      <h4 className="ui header color-grey">Phone Number :</h4>
                    </div>
                    <div className="eight wide column">
                      <h4 className="ui header color-grey">
                        {this.props.user.license}
                      </h4>
                      <h4 className="ui header color-grey">
                        {this.props.user.email}
                      </h4>
                      <h4 className="ui header color-grey">
                        {this.props.user.phone}
                      </h4>
                    </div>
                  </div>
                  <div className="ui section divider"></div>
                </div>
                <div className={css.accessHistorySection}>
                  {accessHistoryLoading ? (
                    <div className="ui active centered inline massive loader"></div>
                  ) : (
                    history.length > 0 && (
                      <>
                        <h2 className="ui header color-grey">Access History</h2>

                        {history.map((item) => {
                          return (
                            <div className="ui very relaxed list" key={item[0]}>
                              <div className="item" key={item[0]}>
                                <div className="ui right floated content">
                                  {showAction(item[2])}
                                </div>
                                <div className="content">
                                  {formatDate(item[3])}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="ui segment very padded">
                <div className="ui active centered inline massive loader"></div>
              </div>
            )}
          </div>
          <BackButton to="/registered" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  fetchUser: fetchUser,
  fetchHistory: fetchHistory,
})(Profile);
