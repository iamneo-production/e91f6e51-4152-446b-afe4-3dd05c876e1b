
import React, { useRef, useState, useContext, useEffect } from "react";
import Navbaar from "../Navbaar/Navbaar";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";
import EventDetailsPage from "./EventDetailsPage";
import { Link, useNavigate } from "react-router-dom";

import "./ViewBooking.css"; // Import the CSS file

export default function BookedEventsPage () {
  const { appUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  const jwtToken = appUser?.token;
  const userId = appUser?.id;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const navigate = useNavigate();

  const fetchBookedEvents = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/user/viewEvent/${userId}`, { headers });
      console.log(res.data);

      const reqData = res.data.filter((event) => {
        return appUser.id === event.userId;
      });
      // Reverse the data array to display the last entry first
      const reversedData = reqData.reverse();

      setData(reversedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookedEvents();
  }, []);

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  const convertTo12HourFormat = (time) => {
    const eventTime = new Date(`2050-01-01T${time}`);
    // const formattedEventTime = eventTime.toLocaleString('en-US', {
      return eventTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    // return formattedEventTime;
  };

  const filterEvents = data.filter((singleEvent) => {
    return singleEvent.eventName?.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navigates to the event details page with the specified eventId
  };

  return (
    <div>
      <div className="viewbooking-main-navbaar">
        <Navbaar />
      </div>

      {data.length === 0 ? (
        <div>You have not made any bookings yet.</div>
      ) : (
        <>
          <div className="view-booking-wrap">
            <div className="view-booking-search-box">
              <input
                className="search_input"
                type="text"
                placeholder="Type here to Search"
                name="searchText"
                value={searchText}
                onChange={handleSearch}
              />
              <button type="submit" data-testid="searchEventButton" id="searchEventButton"></button>
            </div>
          </div>

          <nav className="second-viewBooking-navbar">
            <div className="second-viewBooking-navbar-element-one">Event Image</div>
            <div className="second-viewBooking-navbar-element">Event Name</div>
            <div className="second-viewBooking-navbar-element">Booking-Time</div>
            <div className="second-viewBooking-navbar-element">Date</div>
            <div className="second-viewBooking-navbar-element-last">Total Price</div>
          </nav>
          
          
          {filterEvents.map((event, index) => (
        <div
          key={index}
          className={`event-card ${event.deletedEvent ? 'canceled' : ''}`}
          // className={`event-card ${event.deletedEvent !== null ? "canceled" : ''}`}
          onClick={() => handleEventClick(event.eventId)}>
          {event.deletedEvent && <div className="canceled-tag">Canceled</div>}
          <div className="event-details-2">
            <img src={event.eventImg} alt={event.eventName} className="event-image" />
            <h3>{event.eventName}</h3>
            <p>{convertTo12HourFormat(event.eventTime)}</p>
            <p>{event.eventDate}</p>
            <p>₹{event.eventCost}</p>
          </div>
        </div>
      ))}


        </>
      )}
    </div>
  );
};

