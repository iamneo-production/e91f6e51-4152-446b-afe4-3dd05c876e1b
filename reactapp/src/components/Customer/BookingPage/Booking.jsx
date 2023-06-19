import React, { useState,useContext } from "react";
import BookEventSecondPage from "./BookEventSecondPage";
import axios from "axios";
import Navbaar from "../Navbaar/Navbaar";
import { useLocation } from "react-router-dom";
import "./Booking.css"
import { BaseUrl } from "../../../utils/authApi";
import UserContext from "../../../UserContext";
export default function Booking() {
  const {appUser} = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventData, setEventData] = React.useState({
   
  });

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
  console.log(eventData)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  function handleChange(e) {
    const { name, value } = e.target;

    setEventData((prev) => {
      return { ...prev, [name]: value, userId:appUser?.id , eventImg:themeimgUrl,eventName:themeName,eventCost:cost  };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        `${BaseUrl}/user/addEvent`,{headers},
        eventData
      );
      alert(res.data)
     
    } catch (e) {
      console.log(e, e.message);
    }
  }
  return (
    <div>
      <Navbaar />
      <div className="main-container">
     <div className="apply-form">
      {currentPage === 1 && (
        <form className="form-container">
       <div className="floating-label-group">
       <input
              data-testid="enterName"
              id="enterName"
              className="input-form"
              type="text"
              value= {themeName}
              name="eventName"
              placeholder="Enter event name"
              readOnly
              style={{ fontWeight: 'bold'}}
              onChange={handleChange}
            /><label class="floating-label">Enter Event  Name</label>
            </div>
         
          
            <input
              className="input-form"
              type="text"
              name="applicantName"
              id="enterAddress"
              placeholder="Enter applicant name"
              data-testid="enterAddress"
              onChange={handleChange}
            />
          

        
            <input
              className="input-form"
              type="text"
              name="applicantAddress"
              id="enterMobile"
              placeholder="Enter applicant address"
              data-testid="enterMobile"
              onChange={handleChange}
            />
         
          
            <input
              className="input-form"
              type="text"
              name="applicantMobile"
              id="enterEmail"
              placeholder="Enter applicant mobile"
              data-testid="enterEmail"
              onChange={handleChange}
            />
          
         
            <input
              className="input-form"
              type="text"
              name="applicantEmail"
              id="enterAadhaarNo"
              placeholder="Enter applicant email "
              data-testid="enterAadhaarNo"
              onChange={handleChange}
            />
     
         
            <input
              className="input-form"
              type="text"
              name="eventAddress"
              id="enterPanNo"
              placeholder="Enter event address"
              data-testid="enterPanNo"
              onChange={handleChange}
            />
       
         
            <input
            type="date"
             className="input-form"
              name="eventDate"
              placeholder="Enter date"
              onChange={handleChange}
            />
          
          
            <input
              className="input-form"
              type="time"
              name="eventTime"
              id="enterAmount"
              placeholder="Enter event time"
              data-testid="enterAmount"
              onChange={handleChange}
            />
          
          
            <input
              type="text"
              className="input-form"
              name="noOfPeople"
              id="enterMonths"
              placeholder="Enter no of people"
              data-testid="enterMonths"
              onChange={handleChange}
            />
     
        </form>
      )}
      {currentPage === 2 && <BookEventSecondPage handleSubmit={handleSubmit} eventData={eventData} setEventData={setEventData}/>}

      <div className="page-buttons">
        <button
              className={`page-button ${currentPage === 1 ? 'current-page' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
            >
              1
            </button>
            <button
              className={`page-button ${currentPage === 2 ? 'current-page' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(2);
              }}
            >
              2
            </button>
        
      </div>
    </div>
   </div>
    </div>
  
  );
}



