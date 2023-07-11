import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { connect } from "react-redux";
import { deleteUser } from "../actions";
import css from "./delete.module.css";
import { Link } from "react-router-dom";
import { deleteRecords } from "../utils/airtable";
import { getRecords } from "../utils/airtable";

const Delete = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <DeleteComponent
      {...props}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

class DeleteComponent extends React.Component {
  renderInput(formProps) {
    let errorMessage;
    if (formProps.meta.error && formProps.meta.touched) {
      errorMessage = (
        <div className="ui red message">
          <p className="textAlignJustify">Please fill the field.</p>
        </div>
      );
    } else {
      errorMessage = null;
    }
    return (
      <div className="field">
        <label className="color-grey">{formProps.label}</label>
        <input
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
        {errorMessage}
      </div>
    );
  }

  onSubmit = async (formValues) => {
    this.props.setIsLoading(true);
    const formName = formValues?.name?.toLowerCase();
    const formLicense = formValues?.license?.toLowerCase();
    const allUsers = await getRecords();
    const userToDelete = allUsers.reduce((a, c) => {
      const name = c?.fields?.name?.toLowerCase();
      const license = c?.fields?.license?.toLowerCase();
      if (name === formName && license === formLicense) {
        return c?.id;
      }
      return a;
    }, "");
    if (userToDelete) {
      deleteRecords("parkingdata", userToDelete, undefined, () => {
        this.props.deleteUser("1 record deleted");
        this.props.reset("deleteUser");
      });
    } else {
      this.props.deleteUser("0 record deleted");
    }
    this.props.setIsLoading(false);
  };

  renderSuccess = (message) => {
    if (message === "yes") {
      return (
        <div className="ui green message">
          <div className="header">1 User deleted successfully.</div>
        </div>
      );
    } else if (message === "no") {
      return (
        <div className="ui red message">
          <div className="header">Delete Failed.</div>
          <p className="textAlignJustify">
            Please make sure you spelled the name and license number correctly.
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div
        onClick={() => this.props.deleteUser("reset")}
        className={`ui container fluid ${css.deletePageContainer}`}
      >
        <div
          onClick={() => this.props.deleteUser("reset")}
          className={`${css.deleteFormContainer} ui raised very padded segment`}
        >
          <Link to="/registered">
            <i className="chevron left big icon color-grey"></i>
          </Link>
          <h1 className="ui header fontSize-h1 color-grey">Delete</h1>
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field name="name" component={this.renderInput} label="Name" />
            <Field
              name="license"
              component={this.renderInput}
              label="License Plate"
            />
            <button
              className={`${
                this.props.isLoading ? "loading" : ""
              } ui fluid vertical animated huge button`}
              type="submit"
            >
              <div className="visible content">Delete</div>
              <div className="hidden content">Are you sure ?</div>
            </button>
            <div className="ui message">
              <p className="textAlignJustify">
                *Please note that once you've deleted the data, you cannot
                recover it. So please make sure you entered the right name and
                license plate.
              </p>
            </div>
            {this.renderSuccess(this.props.delete)}
          </form>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Please fill this field";
  }
  if (!formValues.license) {
    errors.license = "Please fill this field";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return state;
};

const exportDelete = connect(mapStateToProps, {
  deleteUser: deleteUser,
})(Delete);

export default reduxForm({
  form: "deleteUser",
  validate: validate,
})(exportDelete);
