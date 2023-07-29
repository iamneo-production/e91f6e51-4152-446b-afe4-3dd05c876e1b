import React from "react";
import "./AddOn.css";

// Function component that renders an AddOn card based on the data received through props.
// The component receives a singleCard object as a prop.
export default function AddOnCard({singleCard}) {
  // The component returns the JSX elements to display the AddOn card.
  return (
    // The outer div with the class "Addon-card" represents the container for the AddOn card.
    <div className="Addon-card">
      {/* An image element displaying the AddOn's image with height and width set. */}
      <img height="200px" width="250px" src={singleCard.imgUrlAddons} alt="image" />

      {/* A heading displaying the AddOn's name. */}
      <h2 className="">{singleCard.addOnName}</h2> 

      {/* A div container for additional details of the AddOn. */}
      <div className="">
        <div className="">
          {/* A paragraph displaying the cost of the AddOn. */}
          <p>Cost:{singleCard.addOnPrice}</p>
          
          {/* A paragraph displaying the description of the AddOn. */}
          <p>Description : {singleCard.addOnDescription}</p>
        </div>
      </div>
    </div>
  );
}
