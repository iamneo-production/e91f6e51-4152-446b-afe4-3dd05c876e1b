import React, { useState, useContext } from "react";
import BookEventSecondPage from "./BookEventSecondPage";
import axios from "axios";
import Swal from "sweetalert2";
import Navbaar from "../Navbaar/Navbaar";
import { useLocation } from "react-router-dom";
import "./Booking.css";
import { BaseUrl } from "../../../utils/authApi";
import UserContext from "../../../UserContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Booking() {
  const { appUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventData, setEventData] = useState({});

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const [responseDetails, setResponseDetails] = useState(null);

  const location = useLocation();

  const themeimgUrl = location.state && location.state.themeimgUrl;
  const cost = location.state && location.state.cost;
  const themeName = location.state && location.state.themeName;
  const themeId = location.state && location.state.themeId;
  console.log(eventData);

  const handleNextPage = (e) => {
    e.preventDefault();
    const requiredFields = [
      "applicantName",
      "applicantAddress",
      "applicantMobile",
      "applicantEmail",
      "eventAddress",
      "eventDate",
      "eventTime",
      "noOfPeople",
    ];

    const emptyFields = requiredFields.filter((field) => {
      return isFieldEmpty(field);
    });

    if (emptyFields.length > 0) {
      const message = `Please fill the following fields: ${emptyFields.join(", ")}`;
      Swal.fire("Error", message, "error");
      emptyFields.forEach((field) => {
        const fieldElement = document.getElementById(field);
        if (fieldElement) {
          fieldElement.classList.add("error");
        }
      });
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const isFirstPageFilled = () => {
    // Check if all the required fields on the first page are filled
    return (
      eventData.eventName &&
      eventData.applicantName &&
      eventData.applicantAddress &&
      eventData.applicantMobile &&
      eventData.applicantEmail &&
      eventData.eventAddress &&
      eventData.eventDate &&
      eventData.eventTime &&
      eventData.noOfPeople
    );
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setEventData((prev) => {
      return {
        ...prev,
        [name]: value,
        userId: appUser?.id,
        eventImg: themeimgUrl,
        eventName: themeName,
        eventCost: cost,
        themeId: themeId
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${BaseUrl}/user/addEvent`, { headers }, eventData);
      Swal.fire("Success", res.data, "success");
    } catch (e) {
      console.log(e, e.message);
      Swal.fire("Error", "An error occurred while submitting the form.", "error");
    }
  }

  const isFieldEmpty = (fieldName) => {
    return !eventData[fieldName] || eventData[fieldName].trim() === "";
  };

  const getInputClassName = (fieldName) => {
    return isFieldEmpty(fieldName) ? "input-form error" : "input-form";
  };

  return (
    <div>
      <div className="booking-first-page-main-navbar">
         <Navbaar />
      </div>
      <div className="main-container">
        <div className="apply-form">
          {currentPage === 1 && (
            <form className="form-container">
              <TextField
                data-testid="enterName"
                id="enterName"
                className={`input-form ${getInputClassName("eventName")}`}
                type="text"
                value={themeName}
                name="eventName"
                label="Enter Event Name"
                readOnly
                style={{ fontWeight: "bold" }}
                onChange={handleChange}
              />

              <TextField
                className={getInputClassName("applicantName")}
                type="text"
                name="applicantName"
                id="applicantName"
                label="Enter Applicant Name"
                value={eventData.applicantName || ""}
                onChange={handleChange}
                required
              />

              <TextField
                className={getInputClassName("applicantAddress")}
                type="text"
                name="applicantAddress"
                id="applicantAddres"
                label="Enter Applicant Address"
                value={eventData.applicantAddress || ""}
                onChange={handleChange}
                required
              />

              <TextField
                className={getInputClassName("applicantMobile")}
                type="text"
                name="applicantMobile"
                id="applicantMobile"
                label="Enter Applicant Mobile"
                value={eventData.applicantMobile || ""}
                onChange={handleChange}
                required
              />

              <TextField
                className={getInputClassName("applicantEmail")}
                type="text"
                name="applicantEmail"
                id="applicantEmail"
                label="Enter Applicant Email*"
                value={eventData.applicantEmail || ""}
                onChange={handleChange}
              />

              <TextField
                className={getInputClassName("eventAddress")}
                type="text"
                name="eventAddress"
                id="enterPanNo"
                label="Enter Event Address*"
                value={eventData.eventAddress || ""}
                onChange={handleChange}
              />

              <TextField
                type="date"
                className={getInputClassName("eventDate")}
                name="eventDate"
                value={eventData.eventDate || ""}
                onChange={handleChange}
              />

              <TextField
                className={getInputClassName("eventTime")}
                type="time"
                name="eventTime"
                id="enterAmount"
                value={eventData.eventTime || ""}
                onChange={handleChange}
              />

              <TextField
                type="text"
                className={getInputClassName("noOfPeople")}
                name="noOfPeople"
                id="noOfPeople"
                label="Enter Number of People*"
                value={eventData.noOfPeople || ""}
                onChange={handleChange}
              />
            </form>
          )}
          {currentPage === 2 && (
            <BookEventSecondPage handleSubmit={handleSubmit} eventData={eventData} setEventData={setEventData} />
          )}

          <div className="page-buttons">
            {currentPage > 1 && (
              <button className="page-button previous-button" onClick={handlePreviousPage}>
                Previous
              </button>
            )}
            {currentPage < 2 && (
              <button className="page-button next-button" onClick={handleNextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}