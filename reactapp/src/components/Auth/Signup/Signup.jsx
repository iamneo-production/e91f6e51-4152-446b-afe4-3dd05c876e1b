import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../../../utils/authApi";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment, IconButton } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Signup.css";

export default function Signup() {
  const [userType, setAdminOrUser] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
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
      alert("Password must contain at least 8 characters, including one number, one lowercase and uppercase character, and one special character like #,@,$,!");
      console.log("Password must contain at least 8 characters, including one number, one lowercase and uppercase character, and one special character like #,@,$,!");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (!mobileNumberRegex.test(mobileNumber)) {
      console.log("Invalid mobile number");
      alert("Invalid Mobile no.");
      return;
    } else {
      const response = await signUpUser(email, mobileNumber, password, userType, userName);
      console.log(response);
    }
  }

  return (
    <div className="register-main-container">
      <div className="register-form">
         <div>
          <h1 className="register-heading">Register</h1>
        </div>
        <FormControl className="input-style-signup-select" sx={{ marginBottom: 2 }}>
          <InputLabel>User Type</InputLabel>
          <Select
            value={userType}
            onChange={(e) => setAdminOrUser(e.target.value)}
            label="User Type"
            size="small" // Set the size to "small"
          >
            <MenuItem value="">Select user type</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className="input-style-signup"
          data-testid="email"
          type="email"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          size="small" // Set the size to "small"
        />
        <TextField
          className="input-style-signup"
          data-testid="username"
          type="text"
          label="Username"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          margin="normal"
          size="small" // Set the size to "small"
        />
        <TextField
          className="input-style-signup"
          data-testid="mobileNumber"
          type="text"
          label="Mobile Number"
          placeholder="Enter Mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          fullWidth
          margin="normal"
          size="small" // Set the size to "small"
        />
        <FormControl className="input-style-signup" sx={{ marginBottom: 2 }}>
          <TextField
            data-testid="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton> */}
                </InputAdornment>
              ),
            }}
            size="small" // Set the size to "small"
          />
        </FormControl>
        <FormControl className="input-style-signup" sx={{ marginBottom: 2 }}>
          <TextField
            data-testid="confirmPassword"
            type= "text"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            size="small" // Set the size to "small"
          />
        </FormControl>

        <button
          data-testid="submitButton"
          onClick={handleSignup}
          className="signup-button"
        >
          Submit
        </button>

        <p className="loginPara">
          Already a user?{" "}
          <Link data-testid="signinLink" id="signinLink" to="/user/login">
            &nbsp; Login
          </Link>
        </p>
      </div>
    </div>
  );
}