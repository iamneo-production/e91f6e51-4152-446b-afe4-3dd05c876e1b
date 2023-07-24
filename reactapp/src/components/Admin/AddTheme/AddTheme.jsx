import React, { useRef, useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../Navbar/Navbar";
import styles from "./AddTheme.module.css";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";

import { Card } from "antd";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { DeleteOutlined,EditOutlined  } from "@ant-design/icons";


const { Meta } = Card;

const AddTheme = () => {
  const { appUser, setAppUser } = useContext(UserContext);
  const themeName = useRef();
  const imageUrl = useRef();
  const photographerDetails = useRef();
  const videographerDetails = useRef();
  const returnGift = useRef();
  const themeCost = useRef();
  const description = useRef();
  const location = useRef();
  const [data, setData] = useState([]);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if any required field is empty
    const requiredFields = [
      themeName.current.value,
      imageUrl.current.value,
      photographerDetails.current.value,
      videographerDetails.current.value,
      returnGift.current.value,
      themeCost.current.value,
      description.current.value,
      location.current.value,
    ];

    const emptyFields = requiredFields.filter((field) => !field || field.trim() === "");

    if (emptyFields.length > 0) {
      const message = `Please fill all the fields before proceeding further`;
      Swal.fire("Error", message, "error");
      emptyFields.forEach((field) => {
        const fieldElement = document.getElementById(field);
        if (fieldElement) {
          fieldElement.classList.add("error");
        }
      });
      return;
    }

    const themeModel = {
      themeName: themeName.current.value,
      themeimgUrl: imageUrl.current.value,
      themephotographer: photographerDetails.current.value,
      themeVideographer: videographerDetails.current.value,
      themeReturnGift: returnGift.current.value,
      cost: themeCost.current.value,
      themeDescription: description.current.value,
      location: location.current.value,
    };



    try {
      const res = await axios.post(`${BaseUrl}/admin/addTheme`, themeModel, { headers });
      console.log("return from backend", res.data);
      Swal.fire("Success", "Theme added successfully!", "success");
      // Refresh the data after adding the theme
      getAllThemes();
      // Reset the form fields
      themeName.current.value = "";
      imageUrl.current.value = "";
      photographerDetails.current.value = "";
      videographerDetails.current.value = "";
      returnGift.current.value = "";
      themeCost.current.value = "";
      description.current.value = "";
      location.current.value = "";
    } catch (e) {
      console.log(e.message);
      Swal.fire("Error", "An error occurred while submitting the form.", "error");
    }
  };

  const getAllThemes = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/admin/theme`, { headers });
      console.log("res", res.data);

      // Reverse the data array to display the last entry first
      const reversedData = res.data.reverse();

      setData(reversedData);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleDelete(row) {
    console.log(row);
    try {
      const res = await axios.delete(`${BaseUrl}/admin/deleteTheme/${row.themeId}`, { headers });
      const data = res.data;
      console.log("res after delete", data);

      setData((prevItems) => prevItems.filter((item) => item.themeId !== row.themeId));
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch the data initially
  useEffect(() => {
    getAllThemes();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.main_content}>
        <div className={styles.container}>
          <div className={styles.theme_form}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form_row}>
                <TextField
                  type="text"
                  label="Enter Theme Name"
                  fullWidth
                  inputRef={themeName}
                />
                <TextField
                  type="text"
                  label="Enter Image URL"
                  fullWidth
                  inputRef={imageUrl}
                />
                <TextField
                  type="text"
                  label="Enter Photographer Details"
                  fullWidth
                  inputRef={photographerDetails}
                />
                <TextField
                  type="text"
                  label="Enter Videographer Details"
                  fullWidth
                  inputRef={videographerDetails}
                />
                <TextField
                  type="text"
                  label="Enter Theme Return Gift"
                  fullWidth
                  inputRef={returnGift}
                />
                <TextField
                  type="text"
                  label="Enter Theme Cost"
                  fullWidth
                  inputRef={themeCost}
                />
                <TextField
                  type="text"
                  label="Enter Theme Description"
                  fullWidth
                  multiline
                  inputRef={description}
                />
                <TextField
                  type="text"
                  label="Location"
                  fullWidth
                  inputRef={location}
                />
              </div>
              <div className={styles.add_btn_container}>
                <button type="submit" className={styles.add_btn}>
                  Add Theme
                </button>
              </div>
            </form>
          </div>
          <div className={styles.themes_view}>
            <div className={styles.theme_cards_wrapper}>
              {data?.map((item) => (
                <div>
                  <Card className={styles.card} hoverable>
                    <img alt="example" src={item.themeimgUrl} />
                    <div className={styles.event_details}>
                      <div className={styles.event_details_place}>
                        <span className={styles.event_text}>{item.themeName}</span>
                        <span className={styles.event_text}>₹ {item.cost}</span>
                      </div>
                    </div>
                    <EditOutlined
                          className={styles.edit_icon}
                          // onClick={() => handleEdit(item)} // Add your edit functionality here
                        />
                    <div className={styles.card_actions}>
                      <DeleteOutlined
                        className={styles.delete_icon}
                        onClick={() => handleDelete(item)}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTheme;