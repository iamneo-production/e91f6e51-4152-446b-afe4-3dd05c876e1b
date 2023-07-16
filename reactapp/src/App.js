
import React, { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import HomePage from "./components/Customer/HomepPage/HomePage";
import Booking from "./components/Customer/BookingPage/Booking";
import ViewBookedEvents from "./components/Customer/ViewBooking/ViewBooking";
import AddTheme from "./components/Admin/AddTheme/AddTheme";
import AddMenu from "./components/Admin/AddMenu/AddMenu";
import Addons from "./components/Admin/AddOns/AddOns";
import { UserProvider,UserContext } from "./UserContext";
import PageNotFound from "./components/Customer/PageNotFound/PageNotFound.jsx";
import EventDetailsPage from "./components/Customer/ViewBooking/EventDetailsPage";
import EditEventPage from "./components/Customer/ViewBooking/EditEventPage";import FoodMenuPage from "./components/Customer/Food_menu/Foodmenu";


function App() {
  const { appUser } = useContext(UserContext);
  const userRole = appUser?.roles;
  console.log("appuserrole : ", userRole);
  
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />

        {/* USER ROUTES */}
        {userRole === "user" && (
          <>
            <Route path="/user/getAllThemes" element={<HomePage />} />
            <Route path="/user/bookTheme" element={<Booking />} />
            <Route path="/user/bookTheme/:id" element={<Booking />} />
            <Route path="/user/getBookedTheme" element={<ViewBookedEvents />} />
            <Route path="/event/:eventId" element={<EventDetailsPage />} />
            //<Route path="/user/editEvent/:eventId" element={<EditEventPage />} />
            <Route path="/event/:eventId/edit" element={<EditEventPage />} />

            <Route path="/user/Foodmenu" element={<FoodMenuPage />} />
          </>
        )}

        {/* ADMIN ROUTES */}
        {userRole === "admin" && (
          <>
            <Route path="/admin/home" element={<AddTheme />} />
            <Route path="/admin/addMenu" element={<AddMenu />} />
            <Route path="/admin/addAddon" element={<Addons />} />
          </>
        )}

        {/* PAGE NOT FOUND */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* </ThemeProvider> */}
    </div>
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default AppWrapper;
