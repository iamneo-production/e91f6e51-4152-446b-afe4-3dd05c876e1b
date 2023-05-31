import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import "/home/coder/project/workspace/reactapp/src/components/Customer/HomepPage/HomePage.css";
import { BASE_URL } from "/home/coder/project/workspace/reactapp/src/config/config";
import axios from 'axios'
import Rating from "./Rating";
import EventCard from "/home/coder/project/workspace/reactapp/src/components/Customer/HomepPage/EventCard";
import Navbaar from "/home/coder/project/workspace/reactapp/src/components/Customer/Navbaar/Navbaar";


export default function HomePage() {
  const [data, setData] = useState([
    {
          "id": 1,
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GErBYryEox07LIr05optVAo-Dpf-0NPi8g&usqp=CAU",
          "name": "Cosmic Carnival",
          "place": "Hyd",
          "price": "950",
          "rating": 2
        },
        {
          "id": 2,
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_svJZnWhWB0X0ddEhomZqS-0PUlEb8EXtQ&usqp=CAU",
          "name": "Fire and Ice Event",
          "place": "Delhi",
          "price": 5000,
          "rating": 4
        },
        {
          "id": 3,
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Z81HL2v570DPubH9NmI44rn4zEEd0eK0Fw&usqp=CAU",
          "name": "Garden Party",
          "place": "Mumbai",
          "price": 2000,
          "rating": 4
        },
        {
          "id": 4,
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1QmtnkPxiKFvwuS_pH9PRMDwfq3WFo4Epw&usqp=CAU",
          "name": "Masquerade Ball",
          "place": "Kolkata",
          "price": 1000,
          "rating": 2
        },
        {
          "id": 5,
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7ztqD3zg7Lh0jw58_6SokRFYisSIU1YPwg&usqp=CAU",
          "name": "Rose Events",
          "place": "Bangalore",
          "price": 1100,
          "rating": 1
        },
        {
          "id": 6,
          "imgUrl": "https://images.squarespace-cdn.com/content/v1/59eb9dfd692ebe60a346d3b3/1520002590112-DBFI9QYI9DQZVYRS6P5B/minteventdesign.com%2B_%2BMint%2BEvent%2BDesign%2BParty%2BPlanning%2B_%2BVintage%2BCarousel%2BThemed%2BBirthday%2BParties%2BFor%2BKids%2B_%2B%284%29.jpg?format=1000w",
          "name": "Vintage Events",
          "place": "Goa",
          "price": 1200,
          "rating": 3
        }
      
  ]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");

  // useEffect(() => {

  //   async function getAllThemes() {
  //     try {
  //       const res = await axios.get(`${BASE_URL}/getAllThemes`);
  //       setData(res.data);
  //       console.log("res",res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   getAllThemes();

  // }, [])


  function handleSearch(e) {
    setSearchText(e.target.value);
  }
//- ---------    UPDATE RATING ------//
  function handleRating(id, rating) {
    console.log(id, rating)

    const updatedData = data.map((event) => {
      if (event.id === id) {
        return { ...event, rating };
      } else {
        return event;
      }
    });
//     fetch(`${BASE_URL}/getAllThemes/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData.find((event) => event.id === id)),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("updated", data.id, data)
//         setData(updatedData)
//       })
//       .catch((e) => {
//         console.log(e)
//       })
    axios.patch(`${BASE_URL}/getAllThemes/${id}`, updatedData.find((event) => event.id === id))
    .then((res) => {
      console.log("updated", res.data.id, res.data);
      setData(updatedData);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  const filterEvents = data.filter((singleEvent) => {
    return singleEvent.name.toLowerCase().includes(searchText.toLowerCase());
  });
/*Dropdown filter*/
  const sortEvents = filterEvents.sort((a, b) => {
    if (sortBy === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "nameDesc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "priceAsc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === "priceDesc") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else {
      return 0;
    }
  });

  const events = sortEvents.map((singleEvent) => {
    return (
  
      <EventCard singleEvent={singleEvent} handleRating={handleRating} key={singleEvent.id} />
   
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