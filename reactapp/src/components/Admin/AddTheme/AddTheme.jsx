<<<<<<< HEAD
import { React, useRef, useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar"
=======
import React, { useRef, useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../Navbar/Navbar";
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
import styles from "./AddTheme.module.css";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const AddTheme = () => {
  const { appUser, setAppUserl } = useContext(UserContext);
=======

import { Card } from "antd";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { DeleteOutlined,EditOutlined  } from "@ant-design/icons";


const { Meta } = Card;

const AddTheme = () => {
  const { appUser, setAppUser } = useContext(UserContext);
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
  const themeName = useRef();
  const imageUrl = useRef();
  const photographerDetails = useRef();
  const videographerDetails = useRef();
  const returnGift = useRef();
  const themeCost = useRef();
  const description = useRef();
<<<<<<< HEAD
  const navigate = useNavigate();
=======
  const location = useRef();
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
  const [data, setData] = useState([]);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

<<<<<<< HEAD
  async function handleSubmit() {
    console.log("i am handle submit");
=======
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

>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
    const themeModel = {
      themeName: themeName.current.value,
      themeimgUrl: imageUrl.current.value,
      themephotographer: photographerDetails.current.value,
      themeVideographer: videographerDetails.current.value,
      themeReturnGift: returnGift.current.value,
      cost: themeCost.current.value,
      themeDescription: description.current.value,
<<<<<<< HEAD
    };

    try {
      const res = await axios.post(`${BaseUrl}/admin/addTheme`,themeModel,{ headers });
      console.log("return from backend", res.data);
      alert(res.data);

      // Refresh the data after adding the theme
      getAllThemes();

=======
      location: location.current.value,
    };



    try {
      const res = await axios.post(`${BaseUrl}/admin/addTheme`, themeModel, { headers });
      console.log("return from backend", res.data);
      Swal.fire("Success", "Theme added successfully!", "success");
      // Refresh the data after adding the theme
      getAllThemes();
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
      // Reset the form fields
      themeName.current.value = "";
      imageUrl.current.value = "";
      photographerDetails.current.value = "";
      videographerDetails.current.value = "";
      returnGift.current.value = "";
      themeCost.current.value = "";
      description.current.value = "";
<<<<<<< HEAD
    } catch (e) {
      console.log(e.message);
    }
  }
=======
      location.current.value = "";
    } catch (e) {
      console.log(e.message);
      Swal.fire("Error", "An error occurred while submitting the form.", "error");
    }
  };
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d

  const getAllThemes = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/admin/theme`, { headers });
<<<<<<< HEAD
      console.log("res",res.data);
      
=======
      console.log("res", res.data);

>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
      // Reverse the data array to display the last entry first
      const reversedData = res.data.reverse();

      setData(reversedData);
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
  //to fetch the data in starting  without it it will not fetch data
  useEffect(() => {
    getAllThemes();
  }, []);

    async function handleDelete(row) {
    console.log(row);
    try {
      const res = await axios.delete(
        `${BaseUrl}/admin/deleteTheme/${row.themeId}`, { headers }
      );
      const data = res.data;
      console.log("res after delte", data);

      setData((prevItems) =>
        prevItems.filter((item) => item.themeId !== row.themeId)
      );
    } catch (e) {
      console.log(e);
    }
  }
=======
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
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d

  return (
    <>
      <Navbar />
      <div className={styles.main_content}>
        <div className={styles.container}>
          <div className={styles.theme_form}>
<<<<<<< HEAD
            <div className={styles.form}>
              <input
                type="text"
                placeholder="Enter Theme Name"
                ref={themeName}
              />
              <input type="text" placeholder="Enter Image URL" ref={imageUrl} />
              <input
                type="text"
                placeholder="Enter Photographer Details"
                ref={photographerDetails}
              />
              <div className={styles.add_btn_container}>
                <input
                  type="submit"
                  value="Add Theme"
                  className={styles.add_btn}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <div className={styles.form}>
              <input
                type="text"
                placeholder="Enter Videographer Details"
                ref={videographerDetails}
              />
              <input
                type="text"
                placeholder="Enter Theme Return Gift"
                ref={returnGift}
              />
              <input
                type="text"
                placeholder="Enter Theme Cost"
                ref={themeCost}
              />
              <textarea
                type="text"
                placeholder="Enter Theme Description"
                cols={20}
                rows={10}
                ref={description}
              />
            </div>
          </div>
          <div className={styles.themes_view}>
            <div className={styles.card_scroll_view}>
              {data?.map((item)=>{
              return(
                <Card
                key={item.themeId}
                    hoverable
                    style={{
                      width: 300,
                    }}
                    cover={
                      <img
                        alt="example"
                        src={item.themeimgUrl}
                      />
                    }
                    actions={[
                      <EditOutlined key="edit" onClick={() => {
                        console.log("clicked")
                      }}/>,
                      <DeleteOutlined key="ellipsis" onClick={() => handleDelete(item)}/>,
                    ]}
                  >
                    <Meta
                      title={item.themeName}
                      description={`₹ ${item.cost}`}
                    />
                  </Card>
              )})}
=======
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
>>>>>>> 086eb3db70898690f0b26d6fd1429d8bac225e2d
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTheme;