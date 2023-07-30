import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../utils/authApi";
import "./EditEventPage.css";
import Navbaar from "../Navbaar/Navbaar";

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    noOfPeople: "",
    eventAddress: "",
    applicantAddress: "",
    applicantEmail: "",
    applicantMobile: "",
    applicantName: "",
    // other event fields...
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/user/event/${eventId}`);
        setEventDetails(res?.data);
        setFormData({
          eventName: res.data.eventName,
          eventDate: res.data.eventDate,
          eventTime: res.data.eventTime,
          noOfPeople: res.data.noOfPeople,
          eventAddress: res.data.eventAddress,
          applicantAddress: res.data.applicantAddress,
          applicantEmail: res.data.applicantEmail,
          applicantMobile: res.data.applicantMobile,
          applicantName: res.data.applicantName,
          // update other form fields with existing event data
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${BaseUrl}/user/editEvent/${eventId}`, formData);
      // Redirect to the event details page after successful update
      navigate(`/event/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-container-editevent">
      <div className="viewbooking-main-navbaar">
        <Navbaar />
      </div>
      {eventDetails ? (
        <div className="edit-event-page">
          <h2>Edit Event</h2>
          <form className="edit-event-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Event Name:
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Event Date:
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Event Time:
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Number of people:
                <input
                  type="text"
                  name="noOfPeople"
                  value={formData.noOfPeople}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Event Address:
                <input
                  type="text"
                  name="eventAddress"
                  value={formData.eventAddress}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Applicant Name:
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Applicant Email:
                <input
                  type="email"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Applicant Mobile:
                <input
                  type="text"
                  name="applicantMobile"
                  value={formData.applicantMobile}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Applicant Address:
                <input
                  type="text"
                  name="applicantAddress"
                  value={formData.applicantAddress}
                  onChange={handleInputChange}
                />
              </label>
              {/* render other form inputs for additional event fields */}
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      ) : (
        <div>Loading event details...</div>
      )}
    </div>
  );
};

export default EditEventPage;