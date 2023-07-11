import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../utils/authApi";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/user/event/${eventId}`);
        setEventDetails(res?.data);
        console.log("result",res)
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleEdit = () => {
    // Redirect to the edit page passing the event ID as a parameter
    
    // navigate(`user/editEvent/${id}`);
  };

  const handleDelete = async () => {
    try {
      // Make an API request to delete the event
      await axios.delete(`${BaseUrl}/event/${eventId}`);
      // Redirect to a success page or go back to the previous page
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  
   function handleCancel(){
    console.log("clicked")
      const today = new Date().toISOString().split('T')[0]; 
      const eventDate = new Date(eventDetails.eventDate).setHours(0, 0, 0, 0); // Get event date with time set to midnight

      console.log(today)
      console.log(eventDate)
      if (today < eventDate) {
        alert("Event can't be cancelled");
        return;
      }
  }

  if (!eventDetails) {
    return <div>Loading event details...</div>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <div>
        <img src={eventDetails.eventImg} alt={eventDetails.eventName} />
        <h3>{eventDetails.eventName}</h3>
        <p>Event Date: {eventDetails.eventDate}</p>
        <p>Event Time: {eventDetails.eventTime}</p>
        
        
        {/* Display additional event details as needed */}
        <div className="buttons-container">
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
          <button onClick={handleCancel} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { BaseUrl } from "../../../utils/authApi";

// // const EventDetailsPage = () => {
// //   const { eventId } = useParams();
// //   const [eventDetails, setEventDetails] = useState(null);

// //   useEffect(() => {
// //     const fetchEventDetails = async () => {
// //       try {
// //         const res = await axios.get(`${BaseUrl}/event/${eventId}`);
// //         setEventDetails(res.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchEventDetails();
// //   }, [eventId]);

// //   if (!eventDetails) {
// //     return <div>Loading event details...</div>;
// //   }

// //   return (
// //     <div>
// //       <h2>Event Details</h2>
// //       <div>
// //         <img src={eventDetails.eventImg} alt={eventDetails.eventName} />
// //         <h3>{eventDetails.eventName}</h3>
// //         <p>Event Date: {eventDetails.eventDate}</p>
// //         <p>Event Time: {eventDetails.eventTime}</p>
// //         {/* Display additional event details as needed */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default EventDetailsPage;
