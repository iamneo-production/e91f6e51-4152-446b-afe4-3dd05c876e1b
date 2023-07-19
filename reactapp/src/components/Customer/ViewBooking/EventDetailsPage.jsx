import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../utils/authApi";
import "./EventDetailsPage.css";
import Navbaar from "../Navbaar/Navbaar";
import UserContext from "../../../UserContext";
import Modal from "react-modal"
import styled from 'styled-components';

const EventDetailsPage = () => {
  const { appUser } = useContext(UserContext);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [cancelData] = useState({ deletedEvent: "User cancelled the Event", });
  // for ratings
  const [rate, setRate] = useState(0);
  // const [rate, setRate] = useState(eventDetails?.rating || 0);
  const [isModalOpen, setisModalOpen] = useState(false)
  const [ratingDes, setRatingDes] = useState("")

  //for styling of rating model
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 5vh;
    font-size: 60px;
    `
  const Radio = styled.input`
    display: none;
    `
  const Rating = styled.div`
    cursor: pointer;
    `

  const jwtToken = appUser?.token;
  const userId = appUser?.id;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  
  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/user/event/${eventId}`);
      setEventDetails(res?.data);
      console.log("result", res);
      setRate(res?.data?.rating);
      setRatingDes(res?.data?.rating_Discription);
    } catch (error) {
      console.error(error);
    }

  };
  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const handleEdit = () => {
    // Redirect to the edit page passing the event ID as a parameter
    navigate(`/event/${eventId}/edit`);
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${BaseUrl}/user/CancelEvent/${eventId}`, cancelData);
      // Redirect to the event details page after successful update
      navigate(`/user/getBookedTheme`);
      alert(res.data);
    } catch (error) {
      console.error(error);
    }
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
                  <p style={{ fontWeight: '600' }}>Event Date:</p>
                  <p className="event-details-value"> {eventDetails.eventDate}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Event Time:</p>
                  <p className="event-details-value">{eventDetails.eventTime}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Number of People: </p>
                  <p className="event-details-value">{eventDetails.noOfPeople}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Applicant Name: </p>
                  <p className="event-details-value">{eventDetails.applicantName}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Applicant Email: </p>
                  <p className="event-details-value">{eventDetails.applicantEmail}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Applicant Mobile: </p>
                  <p className="event-details-value">{eventDetails.applicantMobile}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Applicant Address: </p>
                  <p className="event-details-value">{eventDetails.applicantAddress}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Event Address: </p>
                  <p className="event-details-value">{eventDetails.eventAddress}</p>
                </div>
                <div className="event-details-field">
                  <p style={{ fontWeight: '600' }}>Event Cost: </p>
                  <p className="event-details-value">{eventDetails.eventCost}</p>
                </div>
              </div>
              {/* Display additional event details as needed */}
              {getButtonSection(eventDetails.deletedEvent,eventDetails.eventDate)}
              
              
              <div>
                <Modal isOpen={isModalOpen} className="Modal">
                  <div className="ModalContent">
                    <h1>Please give Us Rating</h1>
                    
                    <Container>
                      {[...Array(5)].map((item, index) => {
                        
                        const givenRating = index + 1;
                        const starColor = givenRating <= rate ? "#FFD700" : "#C0C0C0";  // Set gold color for filled stars, and grey for empty stars
                        //const starColor = givenRating <= eventDetails.rating ? "#FFD700" : "#C0C0C0";
                        // console.log("previous rating",rate)
                        console.log("previouslycoming_rating",eventDetails.rating)
                        return (
                          <label>
                            <Radio
                              type="radio"
                              value={givenRating}
                              onClick={() => {
                                setRate(givenRating);
                              }}
                            />
                            <Rating
                            style={{ color: starColor }}>{givenRating <= rate ? "★" : "☆"}
                            </Rating>
                          </label>
                        );
                      })}
                    </Container>
                    <div className="rating_decription">
                      <input
                        value={ratingDes}
                        onChange={(e) => {
                          setRatingDes(e.target.value);
                        }}
                        placeholder="Description"
                      />
                    </div>
                    <button className="button-for-rating" onClick={handleRating} >Submit</button>
                    <div style={{
                      width: "12px",
                      display: "inline-block"
                    }}></div>
                    <button className="button-for-rating" onClick={() => setisModalOpen(false)}>Close</button>

                  </div>
                </Modal>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading event details...</div>
        )}
      </div>
    </div>
  );
  function getButtonSection(deletedEvent, eventDateStr) {
    if (deletedEvent != null) {
      return renderCancelledButton();
    } else {
      const eventDate = new Date(eventDateStr);
      const today = new Date();
      if (deletedEvent === null && eventDate < today) {
        return renderRatingButton();
      } else if (deletedEvent === null && eventDate >= today) {
        return renderEditButtons();
      }
    }
  }
  
  function renderEditButtons() {
    return (
      <div className="buttons-container">
        <button onClick={handleEdit} className="edit-button">
          Edit
        </button>
        <button onClick={handleCancel} className="delete-button">
          Cancel
        </button>
      </div>
    );
  }
  
  function renderCancelledButton() {
    return (
      <div className="buttons-container">
        <button className="delete-button" disabled={true}>
          You Cancelled this booking
        </button>
      </div>
    );
  }
  
  function renderRatingButton() {
    if (eventDetails?.rating) {
      // If there is an existing rating, show "Edit Rating" button
      return (
        <div className="buttons-container">
          <button className="button-for-rating" onClick={() => setisModalOpen(true)}>
            Edit Rating
          </button>
        </div>
      );
    } else {
      // If no rating exists, show "Rating" button
      return (
        <div className="buttons-container">
          <button className="button-for-rating" onClick={() => setisModalOpen(true)}>
            Rate Theme
          </button>
        </div>
      );
    }
  }
  
  async function handleRating() {
    const ratingObj = {
      "rating": rate,
      "rating_Discription": ratingDes
    };
    console.log(ratingObj);
    try {
      const res = await axios.put(`${BaseUrl}/user/rating/${eventId}`, ratingObj);
      if (res.status === 200) {
        setisModalOpen(false);
        fetchEventDetails();
      }
      console.log(res.data, res.status);
      
    } catch (e) {
      console.log(e);
    }
  }
};

export default EventDetailsPage;