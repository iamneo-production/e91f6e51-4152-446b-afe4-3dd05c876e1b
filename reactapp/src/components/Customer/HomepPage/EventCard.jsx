import React, { useState } from 'react'
import Rating from "./Rating";
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import "./HomePage.css";

export default function EventCard({ singleEvent, handleRating }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className="bday-card" >

     <div onClick={toggleModal}><img  src={singleEvent.themeimgUrl} alt="image" /></div> 

      <h2 className="event-name">{singleEvent.themeName}</h2>
      <div className="place-rating-container">
        <div className="">
          <p>Place:{singleEvent.themeLocation}</p>
          <p>Price:{singleEvent.cost}</p>
        </div>
        {/* <Rating singleEvent={singleEvent} handleRating={handleRating} /> */}
      </div>
      <Modal isOpen={isModalOpen}>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-image">
              <img src={singleEvent.themeimgUrl} alt="Image" />
            </div>
            <div className="modal-details">
              <div className='imgname'><h1>{singleEvent.themeName}</h1></div>
              {/* <div>{singleEvent.rating}</div> */}
              <div className='price'>{singleEvent.cost}</div>
             <div className='desc'><p>{singleEvent.themeDescription}</p></div>
              <p>{singleEvent.themeLocation}</p>
              <div className='info'><p>Birthday Event Details :</p></div>
              <ul>
              <p>{singleEvent.themephotographer}</p>
              <p>{singleEvent.themeVideographer}</p>
              <p>ReturnGift:{singleEvent.themeReturnGift}</p></ul>
            </div>
            <div className="modal-actions">
              <Link to={`/user/bookTheme/${singleEvent.themeId}`} state={{ themeimgUrl: singleEvent.themeimgUrl, themeName: singleEvent.themeName, cost: singleEvent.cost }}>
                <button>Book</button>
              </Link>
              <div>
                <button onClick={() => { setModalOpen(false) }}> Close </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}