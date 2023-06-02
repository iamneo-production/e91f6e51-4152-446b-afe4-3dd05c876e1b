import Navbar from "/home/coder/project/workspace/reactapp/src/components/Admin/Navbar/Navbar.js";


export default function EventCard() {
    // function openModal() {
    //     setIsModalOpen(true);
    //   }
    return (
        <div>
        <div className="navbar">
            <Navbar />
        </div>
       
        {/* <p>
          <button className="add-item-button" onClick={openModal}>
            Add Item
          </button>
        </p> */}
        

      <div className="bday-card">
        
  
          
          <img height="200px" width="250px" src="https://www.shutterstock.com/image-photo/happy-birthday-party-group-friends-260nw-1685260708.jpg" alt="image" />
          
          <h2 className="event-name"></h2>
          <div className="place-rating-container">
            <div className="">
              <p>Place:</p>
              <p>Price:</p>
            </div>
            
          </div>
        
      </div>
      </div>
    )
  }


