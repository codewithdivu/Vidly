import React, { useRef, useEffect, useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
// const Joi = require("joi-browser");

const LoginForm = () => {
  const [data, setdata] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    // console.log("newErrors :>> ", errors);
    setErrors(errors || {});
    if (errors) return;

    console.log("submited...");
  };

  const validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "password is required";
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    const ll = { ...data };
    ll[input.name] = input.value;
    setdata(ll);
    // console.log("ll :>> ", ll);
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          onChange={handleChange}
          value={data.username}
          error={errors.username}
        />
        <Input
          name="password"
          label="Password"
          onChange={handleChange}
          value={data.password}
          error={errors.password}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
