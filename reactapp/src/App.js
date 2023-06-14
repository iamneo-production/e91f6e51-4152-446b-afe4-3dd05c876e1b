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
import AddMenu from "./components/Admin/AddMenu/AddMenu";
import Addons from "./components/Admin/AddOns/AddOns"
import { UserProvider } from "./UserContext";
import PageNotFound from "/home/coder/project/workspace/reactapp/src/components/Customer/PageNotFound";


function App() {
  return (
    <UserProvider>
      <div className="App">
        <ThemeProvider theme={theme}>


          <Routes>
            {/* PUBLIC ROUTE */}
            <Route path="/" element={<Login />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/admin/login" element={<Login />} />


            {/* USER ROUTES */}

            <Route path="/user/getAllThemes" element={<HomePage />} />
            <Route path="/user/bookTheme" element={<Booking />} />
            <Route path="/user/bookTheme/:id" element={<Booking />} />
            <Route path="/user/getBookedTheme" element={<ViewBookedEvents />} />
            <Route path='*' element={<PageNotFound/>} />


            {/* ADMIN ROUTES */}

            <Route path="/admin/home" element={<AddTheme />} />
            <Route path="/admin/addMenu" element={<AddMenu />} />
            <Route path="/admin/addAddon" element={<Addons />} />
          </Routes>

        </ThemeProvider>

      </div>
    </UserProvider>
  );
}

export default App;
