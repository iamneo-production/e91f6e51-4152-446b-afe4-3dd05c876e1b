import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../../utils/authApi";
import UserContext from "../../../UserContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';


export default function Login() {
  const navigate = useNavigate();
  const {appUser, setAppUser } = useContext(UserContext);
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
  const CustomButton = styled(Button)`
        background-color: #fa5dbe;
          &:hover {
          background-color: #f73baf;
  }
`;

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
          <h1 className="login-title">LOGIN</h1>
          <div className="login-box">
          <div>
            <TextField
              className="input-style-login"
              label="Email" variant="outlined"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              size="small"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{
                // Add your custom CSS styles here
                //border: "1px solid #ccc",
                borderRadius: "8px",
                height:"30px",
                marginBottom: "40px",
                width: "103%"
                // ... other styles
              }}
              inputProps={{
                autoComplete: "off",
              }}
            />
          </div>
          <div>
            <div className="password-input-container">
              <TextField
                className="input-style-login "
                label="Password" 
                variant="outlined"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                size = "small"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                sx={{
                  // Add your custom CSS styles here
                  //border: "1px solid #ccc",
                  borderRadius: "8px",
                  height:"30px",
                  width: "103%"
                  // ... other styles
                }}
                inputProps={{
                  autoComplete: "off", // Disable autofill for password field
                }}
              />
              <i
                className={`password-toggle-icon fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: showPassword ? "#FF69B4" : " #515153",
                transform: showPassword ? "translateY(50%)" : "translateY(51%)",
                //transform: showPassword ? "translateX(-50%)" : "translateX(-49%)",
               }}
              ></i>
            </div>
          </div>
          <div className="login-page-container-btn-para">
            <CustomButton className="login-btn" 
            onClick={handleLogin}
            type="submit"
            //fullWidth
            variant="contained"
            sx={{ mt: 6, mb: 1,
               
            }}
            >
              Log in
              </CustomButton>
            {/*<input
              className="login-btn"
              type="submit"
              id="loginButton"
              value="Login"
              onClick={handleLogin}
              />*/}
            
            {/*<p className="loginPara">
              <Link id="signinLink" to="/user/signup">
                <button>Signup</button>
              </Link>
              </p>*/}
            
          </div>
          <div className="login-page-signup-btn">
              <Link id="signinLink" to="/user/signup">
                <CustomButton selected className="sign-up"
                 type="submit"
                 //fullWidth
                 variant="contained"
                 sx={{ mt: 2, mb: 2 }}>
                  Sign up
                 </CustomButton>
              </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}