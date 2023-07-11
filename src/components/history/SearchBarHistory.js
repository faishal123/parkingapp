import React from "react";
import css from "./history.module.css";

class SearchBarHistory extends React.Component {
  state = {
    term: "",
  };

  onInputChange = (event) => {
    this.setState({
      term: event.target.value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div>
        <form className="ui small form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <div className="ui icon input">
              <input
                placeholder="Search using name"
                className={`${css.searchInput} prompt`}
                type="text"
                onChange={this.onInputChange}
                value={this.state.term}
              />
              <i className="search icon"></i>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBarHistory;
