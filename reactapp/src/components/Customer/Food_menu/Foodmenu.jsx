import React, { useRef, useState, useContext, useEffect } from "react";
import Navbaar from "../Navbaar/Navbaar";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";
import './Foodmenu.css';

export default function FoodMenuPage (){
    const { appUser } = useContext(UserContext);
    const [data, setData] = useState(null);
  
    const [searchText, setSearchText] = useState("");
    
    const jwtToken = appUser?.token;
    const userId = appUser?.id;
    console.log("token", jwtToken);
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    const fetchFoodMenu = async () => {
        try {
          const res = await axios.get(`${BaseUrl}/admin/menu`, { headers });
          setData(res.data)
          console.log(res.data);
        }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoodMenu();
  }, []);

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  const filterEvents = data?.filter((singleEvent) => {
    return singleEvent.foodmenu?.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="getFoodmenu-main-navbaar">
        <Navbaar />
      </div>
      <div className="customer-foodmenu-wrap"> 
            <div className="customer-foodmenu-search-box">
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
          {filterEvents?.map((foodmenu, index) => (
            <div key={index} className="foodmenu-card">
              
              <div className="foodmenu-details-2">
                <img src={foodmenu.imageUrl} alt={foodmenu.foodMenuItems} className="foodmenu-image" />
                <h3>{foodmenu.foodMenuItems}</h3>
                <p>₹{foodmenu.foodMenuCost}</p>
              </div>
            </div>
          ))}
        </div>
      );
}