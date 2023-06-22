import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import Select from "react-select";
import { BaseUrl } from "../../../utils/authApi";
import UserContext from "../../../UserContext";
import "./Booking.css"
export default function BookEventSecondPage({ eventData, setEventData }) {
  console.log("object", eventData);
  const [allAddOns, setAllAddOns] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selected add ons id is ", selectedAddOns);
  const { appUser, setAppUserl } = useContext(UserContext);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    async function getAllAddOns() {
      try {
        const res = await axios.get(`${BaseUrl}/admin/getAddon`,{headers});
        setAllAddOns(res.data);
        // [1,2,3]
      } catch (e) {}
    }
    getAllAddOns();
  }, []);

  const addOnList = allAddOns.map((addOn) => {
    return {
      value: addOn.addOnId,
      label: `${addOn.addOnName} \u00A0 \u00A0 \u00A0 ${addOn.addOnPrice}`,
    };
  });

  function updateValue(e) {
    const { value } = e.target;
    setEventData((prev) => {
      return {
        ...prev,
        category: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(eventData);
    const array = selectedAddOns;
    const eD = { ...eventData, addOnId: array.join(",") };

    console.log("event with add on list is", eD);

    try {
      const res = await axios.post(`${BaseUrl}/user/addEvent`, eD,{headers});
      console.log(res.data);
      alert(res.data);
    } catch (e) {}
  }

  function handleSelectTag(e) {
    const selectedAddonsList = e.map((obj) => {
      return obj.value;
    });
    setSelectedAddOns(selectedAddonsList);
  }
  const options = [
    { value: 'veg', label: 'Veg' },
    { value: 'nonveg', label: 'Non-Veg' },
  ];
  const handleChange = (option) => {
    setSelectedOption(option);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "400px", // Adjust the width here as needed
    }),
  };
  return (
    <div>
      
      <div className="second-page-container">
      <div className="grid-container-2">
        <div>
          <Select
            className="category"
            placeholder="Select Category"
            options={options}
            value={selectedOption}
            onChange={handleChange}
            styles={customStyles}
          />
        </div >

        <input type="number" placeholder="Enter quantity of veg items" />

        <input type="number" placeholder="Enter quantity of non-veg items" />
      </div>

      <div>
        {" "}
        <Select
          className="addOnDropdown"
          placeholder="Select Add Ons"
          options={addOnList}
          onChange={handleSelectTag}
          isMulti
          styles={customStyles}
        />
      </div>
    </div>
    <button
    className="submit-btn"
     onClick={handleSubmit}>
      Submit
    </button>
    </div>
  );
}

