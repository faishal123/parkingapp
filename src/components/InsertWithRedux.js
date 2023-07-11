import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { connect } from "react-redux";
import { createRecords } from "../utils/airtable";
import { insertUser } from "../actions";
import css from "./insert.module.css";
import { Link } from "react-router-dom";

const Insert = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <InsertComponent
      {...props}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

class InsertComponent extends React.Component {
  renderInput(formProps) {
    let errorMessage;
    if (formProps.meta.error && formProps.meta.touched) {
      errorMessage = (
        <div className="ui red message">
          <p className="textAlignJustify">{formProps.meta.error}</p>
        </div>
      );
    } else {
      errorMessage = null;
    }
    return (
      <div className="field">
        <label className="color-grey">{formProps.label}</label>
        <input
          type={formProps?.type || "text"}
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
        {errorMessage}
      </div>
    );
  }

  renderSuccess = (message) => {
    if (message === "yes") {
      return (
        <div className="ui green message">
          <div className="header">1 User registered successfully.</div>
        </div>
      );
    } else {
      return null;
    }
  };

  onSubmit = (formValues) => {
    this.props.setIsLoading(true);
    createRecords(
      "parkingdata",
      formValues,
      (e) => {
        console.error(e);
        this.props.setIsLoading(false);
      },
      () => {
        this.props.insertUser("1 record inserted");
        this.props.reset("insertUser");
        this.props.setIsLoading(false);
      }
    );
  };

  render() {
    console.log(this.props.isLoading);
    return (
      <div
        onClick={() => this.props.insertUser("reset")}
        className={`${css.insertPageContainer} ui container fluid`}
      >
        <div
          onClick={() => this.props.insertUser("reset")}
          className={`${css.insertContainer} ui raised very padded segment`}
        >
          <Link to="/registered">
            <i className="chevron left big icon color-grey"></i>
          </Link>
          <h1 className="ui header color-grey fontSize-h1">Register</h1>
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field name="name" component={this.renderInput} label="Name" />
            <Field name="email" component={this.renderInput} label="E-mail" />
            <Field
              type="number"
              name="phone"
              component={this.renderInput}
              label="Phone Number"
            />
            <Field
              name="license"
              component={this.renderInput}
              label="License Plate"
            />
            <button
              className={`ui inverted blue fluid huge ${
                this.props.isLoading ? "loading" : ""
              } button`}
              type="submit"
            >
              Submit
            </button>
            {this.renderSuccess(this.props.insert)}
          </form>
        </div>
      </div>
    );
  }
}

const isStringEmpty = (string) => {
  return !string?.trim();
};

const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const validate = (formValues) => {
  const errors = {};
  if (isStringEmpty(formValues?.name)) {
    errors.name = "Please fill this field";
  }
  if (isStringEmpty(formValues?.license)) {
    errors.license = "Please fill this field";
  }
  const isEmailValid = emailRegex.test(formValues?.email);
  if (!isEmailValid) {
    errors.email = "Please input correct email";
  }
  if (isStringEmpty(formValues?.email)) {
    errors.email = "Please fill this field";
  }
  if (isStringEmpty(formValues?.phone)) {
    errors.phone = "Please fill this field";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return state;
};

const exportInsert = connect(mapStateToProps, {
  insertUser: insertUser,
})(Insert);

export default reduxForm({
  form: "insertUser",
  validate: validate,
})(exportInsert);
