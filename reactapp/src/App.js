import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  BrowserRouter,
} from "react-router-dom";


import theme from "/home/coder/project/workspace/reactapp/src/Theme/Theme.js";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import Homepage from "./components/Customer/HomepPage/HomePage"
import Addtheme from "./components/Admin/Addtheme";

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
        <Route path="getBookedTheme" element={<ViewBookedEvents />} />

        {/* USER ROUTES */}

        <Route path="/user/home" element={<Homepage/>} />
        <Route path="/user/bookTheme" element={<Booking/>} />

        
        {/* ADMIN ROUTES 

  <Route path="/admin/home" element={<AddTheme />} />*/}
  </Routes>
      
      </ThemeProvider>
      
    </div>
  );
}

export default App;
