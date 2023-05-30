import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import Homepage from "./components/Customer/HomepPage/HomePage"
import Addtheme from "./components/Admin/Addtheme";
import ViewBookedEvents from "./components/Customer/ViewBooking/Viewbooking";

function App() {
  return (
    <div className="App">
  
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="getBookedTheme" element={<ViewBookedEvents />} />

        {/* USER ROUTES */}

        <Route path="/user/home" element={<Homepage/>} />
        
        {/* ADMIN ROUTES */}

        <Route path="/admin/home" element={<Addtheme />} />
      </Routes>

      
    </div>
  );
}

export default App;
