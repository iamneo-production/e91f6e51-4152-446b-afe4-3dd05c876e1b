import { React, useRef, useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar"
import styles from "./AddTheme.module.css";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import Modal from "react-modal";
import UserContext from "../../../UserContext";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const AddTheme = () => {
  const { appUser, setAppUserl } = useContext(UserContext);
  const themeName = useRef();
  const imageUrl = useRef();
  const photographerDetails = useRef();
  const location = useRef();
  const videographerDetails = useRef();
  const returnGift = useRef();
  const themeCost = useRef();
  const description = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  async function handleSubmit() {
    console.log("i am handle submit");
    const themeModel = {
      themeName: themeName.current.value,
      themeimgUrl: imageUrl.current.value,
      themephotographer: photographerDetails.current.value,
      location: location.current.value,
      themeVideographer: videographerDetails.current.value,
      themeReturnGift: returnGift.current.value,
      cost: themeCost.current.value,
      themeDescription: description.current.value,
      
    };

    try {
      const res = await axios.post(`${BaseUrl}/admin/addTheme`,themeModel,{ headers });
      console.log("return from backend", res.data);
      alert(res.data);

      // Refresh the data after adding the theme
      getAllThemes();

      // Reset the form fields
      themeName.current.value = "";
      imageUrl.current.value = "";
      photographerDetails.current.value = "";
      location.current.value = "";
      videographerDetails.current.value = "";
      returnGift.current.value = "";
      themeCost.current.value = "";
      description.current.value = "";
      
    } catch (e) {
      console.log(e.message);
    }
  }


  function openModal() {
    setIsModalOpen(true);
  }

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
              <input
                type="text"
                placeholder="Location"
                ref={location}
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
                      <EditOutlined key="edit" onClick={openModal}/>,
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

      
      <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  className={styles.modal} // Apply the 'modal' CSS class
  overlayClassName={styles.modalOverlay}
>
<h2 className={styles.modalTitle}>Edit Theme</h2>
  <div className={styles.modalContent}>
    
    <div className={styles.modalForm}>
      <input
        type="text"
        placeholder="Enter Theme Name"
        ref={themeName}
        className={styles.modalInput}
      />
      <input
        type="text"
        placeholder="Enter Image URL"
        ref={imageUrl}
        className={styles.modalInput}
      />
      <input
        type="text"
        placeholder="Enter Location Details"
        ref={location}
        className={styles.modalInput}
      />
      <input
        type="text"
        placeholder="Enter Photographer Details"
        ref={photographerDetails}
        className={styles.modalInput}
      />
      <div className={styles.modalButtonContainer}>
        <input
          type="submit"
          value="Save Changes"
          className={styles.modalButton}
          onClick={handleSubmit}
        />
      </div>
    </div>
    <div className={styles.modalForm}>
      <input
        type="text"
        placeholder="Enter Videographer Details"
        ref={videographerDetails}
        className={styles.modalInput}
      />
      <input
        type="text"
        placeholder="Enter Theme Return Gift"
        ref={returnGift}
        className={styles.modalInput}
      />
      <input
        type="text"
        placeholder="Enter Theme Cost"
        ref={themeCost}
        className={styles.modalInput}
      />
      <textarea
        type="text"
        placeholder="Enter Theme Description"
        cols={20}
        rows={10}
        ref={description}
        className={styles.modalTextarea}
      />
    </div>
  </div>
</Modal>

    </>
  );
};

export default AddTheme;