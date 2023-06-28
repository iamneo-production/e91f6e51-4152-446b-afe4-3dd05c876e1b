import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../../utils/authApi";
import UserContext from "../../../UserContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../Customer/Navbaar/Navbaar";


export default function Login() {
  const navigate = useNavigate();
  const { appUser, setAppUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

  async function handleLogin() {
    if (email === "" || password === "") {
      alert("Please enter all fields");
      console.log("Enter all fields");
    } else if (!emailRegex.test(email)) {
      alert("Invalid Email");
      console.log("Invalid Email");
      return;
    } else if (!passwordRegex.test(password)) {
      alert(
        "Password must contaion atleast 8 characters, including one number, one lower and upper case character and one special charaacter like #,@,$,!"
      );
      return;
    } else {
      const data = await loginUser(email, password);
      console.log("user is :",data)
      if (data instanceof Error) {
      } else if (data.roles) {
        if (data.roles === "user") {
          console.log(data.roles)
          setAppUser(data);
          navigate("/user/getAllThemes");
        } else if (data.roles === "admin") {
          console.log(data.roles)
          setAppUser(data);
          navigate("/admin/home");
        }
      } else {
        alert("Invalid email or password");
        console.log("Invalid email or password");
      }

     
    }
  }

  return (
    <div>
      {/* <Navbar/> */}
    <div className="login-container">
      
      <div className="image-form-container">
        <div className="image-container">
          <img
            src="https://weddingsbymarius.co.za/wp-content/uploads/sb-instagram-feed-images/353833167_819714532496312_4572391967306604318_nfull.jpg"
            alt="Image"
            className="form-image"
          />
          <div className="image-overlay"></div>
          <div className="image-text">
            <h2>India's Favourite Event Planning Platform</h2>
          </div>
        </div>
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <div className="login-box">
          <div>
            <input
              className="input-style-login"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="password-input-container">
              <input
                className="input-style-login "
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
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
                style={{ color: showPassword ? "#FF69B4" : " #515153" }}
              ></i>
            </div>
          </div>
          <div className="container-btn-para">
            <input
              className="login-btn"
              type="submit"
              id="loginButton"
              value="Login"
              onClick={handleLogin}
            />
            <p className="loginPara">
              <Link id="signinLink" to="/user/signup">
                &nbsp; Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}