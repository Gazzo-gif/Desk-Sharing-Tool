import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import flagImage from "../../images/flag.png"; // Adjusted import path
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // const isEmail = (email) =>
  //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!isEmail(values.email)) {
    //   setErrors({ email: "Invalid email" });
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.userId) {
        // Save user ID in local storage
        localStorage.setItem("userId", data.userId);
        navigate("/home", { replace: true });
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="wrapper">
      <img src={flagImage} alt="Flag" className="flag-image" />
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input
            id="email"
            onChange={(e) =>
              setValues({ ...values, email: e.target.value.trim() })
            }
            type="text"
            placeholder="Email"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            id="password"
            onChange={(e) =>
              setValues({ ...values, password: e.target.value.trim() })
            }
            type="password"
            placeholder="Password"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="forgot-password">
          <a href="/">Forgot Password ?</a>
        </div>
        {loginError && <div className="error">{loginError}</div>}
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;


// Retrieve user ID from local storage
// const userId = localStorage.getItem("userId");