import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpUser, loginUser } from "../../../utils/authApi";
import './Signup.css';

export default function Signup() {
  const [userType, setAdminOrUser] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  const mobileNumberRegex = /^\d{10}$/;

  async function handleSignup() {
    if (
      userType === "" ||
      email === "" ||
      userName === "" ||
      mobileNumber === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please enter all fields");
      console.log("Please enter all details");
    } else if (!emailRegex.test(email)) {
      console.log("Invalid Email");
      alert("Invalid Email");
      return;
    } else if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 8 characters, including one number, one lowercase and uppercase character, and one special character like #,@,$,!"
      );
      console.log(
        "Password must contain at least 8 characters, including one number, one lowercase and uppercase character, and one special character like #,@,$,!"
      );
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (!mobileNumberRegex.test(mobileNumber)) {
      console.log("Invalid mobile number");
      alert("Invalid Mobile no.");
      return;
    } else {
      const response = await signUpUser(
        email,
        mobileNumber,
        password,
        userType,
        userName
      );
      console.log(response);
    }
  }

  return (
    <div className="main-container">
      <div className="bg-container">
        <div className="navbar-register">Register</div>
        <div className="register-main">
          <div className="register-form">
            <div>
              <select
                data-testid="userType"
                className="input-style-signup-select"
                onChange={(e) => {
                  setAdminOrUser(e.target.value);
                }}
              >
                <option value="">Select user type</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div>
              <input
                data-testid="email"
                className="input-style-signup"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                data-testid="username"
                className="input-style-signup"
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                data-testid="mobileNumber"
                className="input-style-signup"
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Enter Mobilenumber"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
              />
            </div>
            <div>
              <div className="password-input-container">
                <input
                  data-testid="password"
                  className="input-style-signup"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <i
                  className={`password-toggle-icon fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: showPassword ? "black" : "black" }}
                ></i>
              </div>
            </div>
            <div>
              <div className="password-input-container">
                <input
                  data-testid="confirmPassword"
                  className="input-style-signup"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  data-testid="submitButton"
                  className="signup-button"
                  type="submit"
                  id="submitButton"
                  value="Submit"
                  onClick={() => {
                    handleSignup();
                  }}
                />
              </div>
            </div>
            <p className="loginPara">
              Already a user?&nbsp;
              <Link data-testid="signinLink" id="signinLink" to="/user/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
