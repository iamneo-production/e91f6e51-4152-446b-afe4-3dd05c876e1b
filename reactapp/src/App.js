import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "/home/coder/project/workspace/reactapp/src/Theme/Theme.js";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import HomePage from "./components/Customer/HomepPage/HomePage";
import Booking from "./components/Customer/BookingPage/Booking";
import ViewBookedEvents from "./components/Customer/ViewBooking/ViewBooking";
import AddTheme from "./components/Admin/AddTheme/AddTheme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        
          
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />
        

        {/* USER ROUTES */}

        <Route path="/user/getAllThemes" element={<HomePage/>} />
        <Route path="/user/bookTheme" element={<Booking/>} />
        <Route path="/user/bookTheme/:id" element={<Booking/>} />
        <Route path="/user/getBookedTheme" element={<ViewBookedEvents />} />

        
        {/* ADMIN ROUTES */}

  <Route path="/admin/home" element={<AddTheme />} />
  </Routes>
      
      </ThemeProvider>
      
    </div>
  );
}

export default App;
