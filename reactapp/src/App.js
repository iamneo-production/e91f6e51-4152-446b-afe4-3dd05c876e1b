<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
=======
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import Homepage from "./components/Customer/HomepPage/HomePage"
import Addtheme from "./components/Admin/Addtheme";
>>>>>>> c1a21bbdd27eb77dd1329560a52ff98b759abf09

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
  
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />

        {/* USER ROUTES */}

        <Route path="/user/home" element={<Homepage/>} />
        
        {/* ADMIN ROUTES */}

        <Route path="/admin/home" element={<Addtheme />} />
      </Routes>

      
>>>>>>> c1a21bbdd27eb77dd1329560a52ff98b759abf09
    </div>
  );
}

export default App;
