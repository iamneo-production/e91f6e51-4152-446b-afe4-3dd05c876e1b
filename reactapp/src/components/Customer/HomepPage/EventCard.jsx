import React from 'react'
import Rating from "./Rating";
import { Link } from 'react-router-dom';

export default function EventCard({ singleEvent, handleRating }) {
  return (
    <div className="bday-card">
      <Link to={`/user/bookTheme/${singleEvent.id}`}  >

        
        <img height="200px" width="250px" src={singleEvent.imgUrl} alt="image" />
        </Link>
        <h2 className="event-name">{singleEvent.name}</h2>
        <div className="place-rating-container">
          <div className="">
            <p>Place:{singleEvent.place}</p>
            <p>Price:{singleEvent.price}</p>
          </div>
          <Rating singleEvent={singleEvent} handleRating={handleRating} />
        </div>
      
    </div>
  )
}
