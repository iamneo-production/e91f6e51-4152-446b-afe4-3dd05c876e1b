import React from "react";
import "./AddOn.css";
export default function AddOnCard({singleCard}) {
  return (
    <div className="Addon-card">
      <img height="200px" width="250px" src={singleCard.imgUrlAddons} alt="image" />
      <h2 className="">{singleCard.addOnName}</h2> 
      <div className="">
        <div className="">
          <p>Cost:{singleCard.addOnPrice}</p>
          <p>Description : {singleCard.addOnDescription}</p>
        </div>
      </div>
      </div>
  );
}