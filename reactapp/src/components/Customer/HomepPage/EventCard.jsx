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

     <div onClick={toggleModal}>
      <img  src={singleEvent.themeimgUrl} alt="image" />

      <h2 className="event-name">{singleEvent.themeName}</h2>
      <div className="place-rating-container">
        <div className="">
          <p>Place:{singleEvent.location}</p>
          <p>Price:{singleEvent.cost}</p>
        </div>
        <Rating rating={singleEvent.averageRating} /> 
      </div>
      </div> 
      <Modal isOpen={isModalOpen}>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-image">
              <img src={singleEvent.themeimgUrl} alt="Image" />
            </div>
            <div className="modal-details">
              <div className='imgname'><h1>{singleEvent.themeName}</h1></div>
              <div className='rate-container '>
              <div className='average-rating'>
              <div>{singleEvent.averageRating}</div>&nbsp;
              <div><Rating rating={singleEvent.averageRating} /></div>&nbsp;
              <p> ( {singleEvent.totalRating} Reviews)</p>
              </div>
              </div>
              <div className='price'><span>&#8377;</span>
              <span>{singleEvent.cost}</span></div>
             <div className='desc'><p>{singleEvent.themeDescription}</p></div>
              <p>{singleEvent.themeLocation}</p>
              <div className='info'><h3>Birthday Event Details </h3></div>
              
              <p><b>Photographer: </b> &nbsp; <span>{singleEvent.themephotographer}</span></p>
              <p><b>Videographer: </b> &nbsp; <span>{singleEvent.themeVideographer}</span></p>
              <p><b>ReturnGift: </b> &nbsp; <span>{singleEvent.themeReturnGift}</span></p>
            </div>
            <div className="modal-actions">
              <Link to={`/user/bookTheme/${singleEvent.themeId}`} state={{ themeimgUrl: singleEvent.themeimgUrl,
               themeName: singleEvent.themeName,cost: singleEvent.cost ,rating: singleEvent.rating,themeId: singleEvent.themeId}}>
                <button className='btn1'>Book</button>
              </Link>
              <div className='btn'>
                <button onClick={() => { setModalOpen(false) }}> Close </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}