import React from 'react'
import Rating from "./Rating";
import { Link } from 'react-router-dom';

export default function EventCard({ singleEvent, handleRating }) {
  return (
    <div className="bday-card">
      <Link to={`/user/bookTheme/${singleEvent.themeId}`}
       state={{themeimgUrl : singleEvent.themeimgUrl, themeName:singleEvent.themeName, cost : singleEvent.cost,
        themeId : singleEvent.themeId}}
      >

        <img height="200px" width="250px" src={singleEvent.themeimgUrl} alt="image" />
        
      <h2 className="event-name">{singleEvent.themeName}</h2>
      <div className="place-rating-container">
        <div className="">
          <p>Place:{singleEvent.themeDescription}</p>
          <p>Price:{singleEvent.cost}</p>
        </div>
        {/* <Rating singleEvent={singleEvent} handleRating={handleRating} /> */}
      </div>
      </Link>

    </div>
  )
}
