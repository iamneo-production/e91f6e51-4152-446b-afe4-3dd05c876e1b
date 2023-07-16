
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../utils/authApi";
import "./EventDetailsPage.css";
import Navbaar from "../Navbaar/Navbaar";
import UserContext from "../../../UserContext";

const EventDetailsPage = () => {
  const { appUser } = useContext(UserContext);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [cancelData, setcancelData] = useState({deletedEvent: "User cancelled the Event",});

  const jwtToken = appUser?.token;
  const userId = appUser?.id;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/user/event/${eventId}`);
        setEventDetails(res?.data);
        console.log("result", res);
        
      } catch (error) {
        console.error(error);
      }
      
    };

    fetchEventDetails();
  }, [eventId]);


  const handleEdit = () => {
    // Redirect to the edit page passing the event ID as a parameter
    navigate(`/event/${eventId}/edit`);
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    try {
     const res=await axios.put(`${BaseUrl}/user/CancelEvent/${eventId}`, cancelData);
      // Redirect to the event details page after successful update
      //navigate(`/event/${eventId}`);
      alert(res.data);
    } catch (error) {
      console.error(error);
    }
  
    // const today = new Date().toISOString().split("T")[0];
    // const eventDate = new Date(eventDetails.eventDate).setHours(0, 0, 0, 0); // Get event date with time set to midnight

    // console.log(today);
    // console.log(eventDate);
    // if (today < eventDate) {
    //   alert("Event can't be cancelled");
    //   return;
    
    
  };

  return (
  <div>
    <div className="viewbooking-main-navbaar">
      <Navbaar />
    </div>
    {eventDetails ? (
      <div className="event-details-container">
        <div className="event-image-container">
          <img
            className="event-image"
            src={eventDetails.eventImg}
            alt={eventDetails.eventName}
          />
        </div>
        <div className="event-details">
          <h2>Event Details</h2>
          <h3>{eventDetails.eventName}</h3>
          <p>Event Date: {eventDetails.eventDate}</p>
          <p>Event Time: {eventDetails.eventTime}</p>
          <p>Number of People: {eventDetails.noOfPeople}</p>
          <p>Applicant Name: {eventDetails.applicantName}</p>
          <p>Applicant Email: {eventDetails.applicantEmail}</p>
          <p>Applicant Mobile: {eventDetails.applicantMobile}</p>
          <p>Applicant Address: {eventDetails.applicantAddress}</p>
          <p>Event Address: {eventDetails.eventAddress}</p>
          <p>Event Cost: {eventDetails.eventCost}</p>

          {/* Display additional event details as needed */}
          <div className="buttons-container">
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button onClick={handleCancel} className="delete-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading event details...</div>
    )}
  </div>
)
};

export default EventDetailsPage;