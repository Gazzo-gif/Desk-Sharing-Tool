import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import flagImage from "../../images/flag.png"; // Adjusted import path

const LoginPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  function submitForm(e) {
    const invalidFields = {};
    if (!isEmail(values.email)) {
      invalidFields.email = "Wrong email";
    }
    setErrors(invalidFields);
    if (!Object.keys(invalidFields).length) {
      alert(JSON.stringify(values));
    } else {
      alert(JSON.stringify(invalidFields.email));
      console.log("invalid");
      // console.log("email: " + values.email);
      // console.log("password: " + values.password);
    }

    e.preventDefault();
  }
  return (
    <div className="wrapper">
      <img src={flagImage} alt="Flag" className="flag-image" />{" "}
      {/* Using the flag.png image */}
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            type="text"
            placeholder="Username"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            type="text"
            placeholder="Email"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type="password"
            placeholder="Password"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="forgot-password">
          <a href="/">Forgot Password ?</a>
        </div>
        <button type="submit" onClick={(e) => submitForm(e)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
