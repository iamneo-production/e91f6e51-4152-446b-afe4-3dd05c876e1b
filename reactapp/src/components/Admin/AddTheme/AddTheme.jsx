import React, { useRef, useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./AddTheme.module.css";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

const { Meta } = Card;

const AddTheme = () => {
  const { appUser, setAppUserl } = useContext(UserContext);
  const themeName = useRef();
  const imageUrl = useRef();
  const photographerDetails = useRef();
  const videographerDetails = useRef();
  const returnGift = useRef();
  const themeCost = useRef();
  const description = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  async function handleSubmit() {
    console.log("i am handle submit");
  
    // Check if any required field is empty
    const requiredFields = [
      themeName.current.value,
      imageUrl.current.value,
      photographerDetails.current.value,
      videographerDetails.current.value,
      returnGift.current.value,
      themeCost.current.value,
      description.current.value,
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
    };
  
    try {
      const res = await axios.post(`${BaseUrl}/admin/addTheme`, themeModel, { headers });
      console.log("return from backend", res.data);
      Swal.fire("Success", res.data, "success");
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
    } catch (e) {
      console.log(e.message);
      Swal.fire("Error", "An error occurred while submitting the form.", "error");
    }
  };

     
  

  const getAllThemes = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/admin/theme`, { headers });
      console.log("res",res.data);
      
      // Reverse the data array to display the last entry first
      const reversedData = res.data.reverse();

      setData(reversedData);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <>
      <Navbar />
      <div className={styles.main_content}>
        <div className={styles.container}>
          <div className={styles.theme_form}>
            <div className={styles.form}>
            <TextField
                type="text"
                label="Enter Theme Name"
                ref={themeName}
              />
              <TextField type="text" label="Enter Image URL" ref={imageUrl} />
              <TextField
                type="text"
                label="Enter Photographer Details"
                ref={photographerDetails}
              />
               <TextField
                type="text"
                label="Location"
                
              />
              <div className={styles.add_btn_container}>
                <TextField
                  type="submit"
                  value="Add Theme"
                  className={styles.add_btn}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <div className={styles.form}>
              <TextField
                type="text"
                label="Enter Videographer Details"
                ref={videographerDetails}
              />
              <TextField
                type="text"
                label="Enter Theme Return Gift"
                ref={returnGift}
              />
              <TextField
                type="text"
                label="Enter Theme Cost"
                ref={themeCost}
              />
              
              <TextField
                type="text"
                label="Enter Theme Description"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTheme;