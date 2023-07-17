import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { BASE_URL } from "../../../utils/userApi";
import axios from 'axios';
import Rating from "./Rating";
import Modal from "react-modal";
import EventCard from "./EventCard.jsx";
import Navbaar from "../Navbaar/Navbaar";
import UserContext from '../../../UserContext';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { appUser, setAppUser } = useContext(UserContext);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  function openModal() {
    setIsModalOpen(true);
  }

  //---fetching events----//

  useEffect(() => {
    async function getAllThemes() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/theme`, { headers });
        setData(res.data);
        console.log("res", res);
      } catch (e) {
        console.log(e);
      }
    }
    getAllThemes();
  }, []);

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  //- ---------    UPDATE RATING ------//

  function handleRating(id, rating) {
    console.log(id, rating);

    const updatedData = data.map((event) => {
      if (event.themeId === id) {
        return { ...event, rating };
      } else {
        return event;
      }
    });
    //------- Rating --------//
    // axios.patch(`${BASE_URL}/user/getAllThemes/${id}`, updatedData.find((event) => event.themeid === id))
    // .then((res) => {
    //   console.log("updated", res.data.id, res.data);
    //   setData(updatedData);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  }

  const filterEvents = data.filter((singleEvent) => {
    return singleEvent.themeName.toLowerCase().includes(searchText.toLowerCase());
  });

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
    return <EventCard singleEvent={singleEvent} handleRating={handleRating} key={singleEvent.themeId} />;
  });

  return (
    <div className="blue-background">
      <div className="Booking-Navabar"><Navbaar /></div>
      {data.length === 0 ? (
        <div>loading... please check connection </div>
      ) : (
        <div className="Homepage">
          <Modal isOpen={isModalOpen}>
            <div>Modal is opened</div>
            <div>
              <button onClick={() => setIsModalOpen(false)}>close</button>
            </div>
          </Modal>
          <div className="wrap">
            {/* Add SearchBar */}
            <div className="search-box">
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
            {/* Add sort by dropdown filter */}
            <div className="filter-container">
              <select id="sortSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">None</option>
                <option value="nameAsc">A-Z</option>
                <option value="nameDesc">Z-A</option>
                <option value="priceAsc">Low to High</option>
                <option value="priceDesc">High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid-container">{events}</div>
        </div>
      )}
    </div>
  );
}
