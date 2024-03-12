
import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import flagImage from "../../images/flag.png"; // Adjusted import path
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const LoginPage = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isEmail(values.email)) {
      setLoginError(t("invalidEmail"));
      return;
    }

    try {
      const response = await fetch("/users/login", {
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
      if (data !== -1) {
        localStorage.setItem("userId", String(data));  
        navigate("/home", { replace: true });
      } else {
        setLoginError(t("invalidCredentials"));
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(t("loginFailed"));
    }
  };

  return (
    <div className="wrapper">
      <img src={flagImage} alt="Flag" className="flag-image" />
      <form>
        <h1>{t("login")}</h1>
        <div className="input-box">
          <input
            id="email"
            onChange={(e) =>
              setValues({ ...values, email: e.target.value.trim() })
            }
            type="text"
            placeholder={t("email")}
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
            placeholder={t("password")}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="forgot-password">
          <a href="/">{t("forgotPassword")}?</a>
        </div>
        {loginError && <div className="error">{loginError}</div>}
        <button type="submit" onClick={handleLogin}>
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
