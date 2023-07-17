
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
      navigate(`/user/getBookedTheme`);
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
  <div className="event-details-page-main">
    <div className="viewbooking-main-navbaar">
      <Navbaar />
    </div>
    <div className="event-details-page">
    {eventDetails ? (
      <div className="event-details-container">
        <div className="event-image-container">
          <img
            className="event-image-viewbooking"
            src={eventDetails.eventImg}
            alt={eventDetails.eventName}
          />
        </div>
        <div className="event-details">
          <div className="event-detail-name-container">
          {/* <h2>Event Details</h2> */}
          <h3 className="event-detail-name">{eventDetails.eventName}</h3>
          </div>
          <div className="event-details-field-container">
            <div className="event-details-field">
              <p style={{fontWeight:'600'}}>Event Date:</p>
              <p className="event-details-value"> {eventDetails.eventDate}</p>
            </div>
            <div className="event-details-field">
            <p style={{fontWeight:'600'}}>Event Time:</p>
            <p className="event-details-value">{eventDetails.eventTime}</p>
            </div>
            <div className="event-details-field">
            <p style={{fontWeight:'600'}}>Number of People: </p>
            <p className="event-details-value">{eventDetails.noOfPeople}</p>
            </div>
            <div className="event-details-field">
            <p style={{fontWeight:'600'}}>Applicant Name: </p>
            <p className="event-details-value">{eventDetails.applicantName}</p>
            </div>
            <div className="event-details-field">
              <p style={{fontWeight:'600'}}>Applicant Email: </p>
              <p className="event-details-value">{eventDetails.applicantEmail}</p>
            </div>
            <div className="event-details-field">
              <p style={{fontWeight:'600'}}>Applicant Mobile: </p>
              <p className="event-details-value">{eventDetails.applicantMobile}</p>
            </div>
            <div className="event-details-field">
              <p style={{fontWeight:'600'}}>Applicant Address: </p>
              <p className="event-details-value">{eventDetails.applicantAddress}</p>
            </div>
            <div className="event-details-field">
              <p style={{fontWeight:'600'}}>Event Address: </p>
              <p className="event-details-value">{eventDetails.eventAddress}</p>
            </div>
            <div className="event-details-field">
              <p style={{fontWeight:'600'}}>Event Cost: </p>
              <p className="event-details-value">{eventDetails.eventCost}</p>
            </div>
          </div>
          {/* Display additional event details as needed */}
          {eventDetails.deletedEvent===null?<div className="buttons-container">
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button onClick={handleCancel} className="delete-button">
              Cancel
            </button>
          </div>:<div className="buttons-container">
            <button className="delete-button" disabled={true}>
              You Cancelled this booking
            </button>
          </div>}
        </div>
      </div>
    ) : (
      <div>Loading event details...</div>
    )}
    </div>
  </div>
)
};

export default EventDetailsPage;