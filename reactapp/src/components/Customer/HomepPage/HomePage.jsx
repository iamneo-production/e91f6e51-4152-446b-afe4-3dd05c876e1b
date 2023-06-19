import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "/home/coder/project/workspace/reactapp/src/components/Customer/HomepPage/HomePage.css";
import { BASE_URL } from "../../../utils/userApi";
import axios from 'axios'
import Rating from "./Rating";
import EventCard from "/home/coder/project/workspace/reactapp/src/components/Customer/HomepPage/EventCard";
import Navbaar from "/home/coder/project/workspace/reactapp/src/components/Customer/Navbaar/Navbaar";


export default function HomePage() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");

      
  //---fetching events----//

  useEffect(() => {

    async function getAllThemes() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/getTheme`);
        setData(res.data)
        console.log("res",res);
      } catch (e) {
        console.log(e);
      }
    }
    getAllThemes();

  }, [])


  function handleSearch(e) {
    setSearchText(e.target.value);
}
//- ---------    UPDATE RATING ------//
  function handleRating(id, rating) {
    console.log(id, rating)

    const updatedData = data.map((event) => {
      if (event.themeId === id) {
        return { ...event, rating };
      } else {
        return event;
      }
    });
                //------- Rating --------//
  //   axios.patch(`${BASE_URL}/user/getAllThemes/${id}`, updatedData.find((event) => event.themeid === id))
  //   .then((res) => {
  //     console.log("updated", res.data.id, res.data);
  //     setData(updatedData);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
   }

  const filterEvents = data.filter((singleEvent) => {
    return singleEvent.themeName.toLowerCase().includes(searchText.toLowerCase());
  });
/*Dropdown filter*/
  const sortEvents = filterEvents.sort((a, b) => {
    if (sortBy === "nameAsc") {
      return a.themeName.localeCompare(b.themeName);
    } else if (sortBy === "nameDesc") {
      return b.themeName.localeCompare(a.themeName);
    } else if (sortBy === "priceAsc") {
      return parseFloat(a.cost) - parseFloat(b.cost);
    } else if (sortBy === "priceDesc") {
      return parseFloat(b.cost) - parseFloat(a.cost);
    } else {
      return 0;
    }
  });

  const events = sortEvents.map((singleEvent) => {
    return (
  
      <EventCard singleEvent={singleEvent} handleRating={handleRating} key={singleEvent.themeId} />
   
    );
  });

  return (
    
    <div  className="blue-background" >
       <Navbaar />
      {data.length === 0
        ? <div>loading... please check connection </div>
        : (
          <div>
            <div className="wrap"> 
           { /*Add SearchBar*/}
             <div className="search-box">
              <input className="search_input"
                type="text"
                placeholder="Type here to Search"
                name="searchText"
                value={searchText}
                onChange={handleSearch}
              />
              <button type="submit" data-testid="searchEventButton" id="searchEventButton"></button> 
              </div>
              {/* Add sort by dropdown filter  */}
               <div className="filter-container">
                <select id="sortSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="">None</option>
                  <option value="nameAsc">A-Z</option>
                  <option value="nameDesc">Z-A</option>
                  <option value="priceAsc"> Low to High</option>
                  <option value="priceDesc"> High to Low</option>
                </select>
              </div>
              </div>
          
            <div className="grid-container">{events}</div>
          </div>
        )}
    </div>
  );
}
