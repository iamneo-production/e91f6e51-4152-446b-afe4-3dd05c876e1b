import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import Homepage from "./components/Customer/HomepPage/HomePage"
import AddTheme from "./components/Admin/AddTheme/AddTheme";

function App() {
  return (
    <div className="App">
  
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />

        {/* USER ROUTES */}

        <Route path="/user/home" element={<Homepage/>} />
        
        {/* ADMIN ROUTES */}

        <Route path="/admin/home" element={<AddTheme />} />
      </Routes>

      
    </div>
  );
}

export default App;
