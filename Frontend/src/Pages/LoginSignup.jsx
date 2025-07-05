import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [toast, setToast] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        showToast("Full name is required");
        return;
      }

      if (!isValidPassword(formData.password)) {
        showToast("Password must be at least 8 characters and include a number");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        showToast("Passwords do not match");
        return;
      }
    }

    const endpoint = isLogin ? "/login" : "/signup";
    const data = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth${endpoint}`,
        data
      );

      localStorage.setItem("user", JSON.stringify(res.data.user || res.data));

      showToast(isLogin ? "Login successful" : "Signup successful");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      showToast(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? "fade-in" : "fade-out"}`}>
        <h2>{isLogin ? "Login to your account" : "Create your account"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>

      {toast.show && <div className="toast">{toast.message}</div>}
    </div>
  );
}

export default LoginSignup;
