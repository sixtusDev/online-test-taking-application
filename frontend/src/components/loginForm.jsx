import React, { Component } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import Input from "./common/input";
import Select from "./common/select";
import Error from "./common/error";
import http from "../services/httpService";
import config from "../config.json";
import "react-toastify/dist/ReactToastify.css";
import "./loginForm.css";

class LoginForm extends Component {
  state = {
    account: {
      idNumber: "",
      level: "",
      courseCode: "",
    },
    courses: [],
    errors: {},
  };

  async componentDidMount() {
    const { data: courses } = await http.get(`${config.apiEndpoint}/courses`);
    this.setState({ courses });
  }

  rules = {
    idNumber: Joi.string()
      .min(9)
      .max(12)
      .regex(new RegExp("^[a-zA-Z]+[/-][0-9]+[a-zA-Z]*[/-][0-9]+$"))
      .required()
      .label("ID Number"),
    level: Joi.string().required().label("Level"),
    courseCode: Joi.string().required().label("Course Code"),
  };

  validate = () => {
    const schema = Joi.object(this.rules);
    const result = schema.validate(this.state.account, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      if (!errors[item.path[0]]) {
        if (item.type === "string.regex.base") {
          errors[item.path[0]] =
            "ID Number should look like this: [csc/15u/3234 or csc-15u-3234]";
        } else {
          errors[item.path[0]] = item.message;
        }
      }
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.rules[name] });
    const { error } = schema.validate(obj);
    if (!error) return;
    if (error.details[0].type === "string.regex.base")
      return "ID Number should look like this: [csc/15u/3234 or csc-15u-3234]";
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const { errors, account } = this.state;
    const errorMessage = this.validateProperty({ name, value });
    const clonedErrors = { ...errors };
    clonedErrors[name] = errorMessage;
    const clonedAccount = { ...account };
    clonedAccount[name] = value;
    this.setState({ account: clonedAccount, errors: clonedErrors });
  };

  convertSlashBasedIdNumberToHyphen = (idNumber) => {
    idNumber = idNumber.split("/");
    if (idNumber.length > 0) return idNumber.join("-");
    return idNumber[0];
  };

  handleStart = async (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return null;

    const { account, courses } = this.state;
    let idNumber = this.convertSlashBasedIdNumberToHyphen(account.idNumber);
    idNumber = idNumber.toLowerCase();
    const data = courses.find((data) => data.courseCode === account.courseCode);
    if (data) {
      const index = data.students.findIndex(
        (d) => d.idNumber.toLowerCase() === idNumber
      );
      if (index === -1)
        return toast.warning(
          "You are not registered for this course; Contact course lecturer!"
        );
      try {
        const payload = {
          courseCode: account.courseCode,
          level: account.level,
          idNumber,
        };
        const result = await http.post(`${config.apiEndpoint}/start`, payload);
        this.props.history.push(
          `/instruction/${account.courseCode}/${idNumber}`
        );
      } catch (ex) {
        if (
          ex.response &&
          ex.response.status >= 400 &&
          ex.response.status < 500
        ) {
          console.log(ex.response);
          toast.error(ex.response.data);
        }
      }
    }
  };

  render() {
    const { account, courses, errors } = this.state;
    const data = courses.filter((data) => data.level === account.level);
    const courseCodes = [];
    data.forEach((d) => courseCodes.push(d.courseCode));

    return (
      <div className="login">
        <div className="container">
          <form className="login-form" onSubmit={this.handleStart}>
            <img src="mau.png" alt="Mautech Logo" className="login-form__img" />
            <h2 className="login-form__heading"></h2>
            {errors.idNumber && <Error error={errors.idNumber} />}
            <Input
              type="text"
              name="idNumber"
              value={account.idNumber}
              placeholder="ID Number"
              onChange={this.handleChange}
            />
            {errors.level && <Error error={errors.level} />}
            <Select
              name="level"
              values={[100, 200, 300, 400, 500]}
              onChange={this.handleChange}
              placeholder="---Select your level---"
            />
            {data.length > 0 ? (
              <React.Fragment>
                {errors.courseCode && <Error error={errors.courseCode} />}
                <Select
                  name="courseCode"
                  values={courseCodes}
                  placeholder="---Select Course---"
                  onChange={this.handleChange}
                />
              </React.Fragment>
            ) : (
              <div className="message">
                No scheduled exam for your level yet
              </div>
            )}
            <button className="login-form__button">Start</button>
            <ToastContainer style={{ fontSize: "1.5rem" }} />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
