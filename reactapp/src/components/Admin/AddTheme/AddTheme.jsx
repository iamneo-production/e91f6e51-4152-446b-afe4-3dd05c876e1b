// import { React, useRef, useState, useContext, useEffect } from "react";
// import Navbar from "../Navbar/Navbar"
// import styles from "./AddTheme.module.css";
// import Modal from "react-modal";
// import { BaseUrl } from "../../../utils/authApi";
// import axios from "axios";
// import UserContext from "../../../UserContext";
// import { useNavigate } from "react-router-dom";
// import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
// import { Card } from 'antd';
// const { Meta } = Card;

// const AddTheme = () => {
//   const { appUser, setAppUserl } = useContext(UserContext);
//   const themeName = useRef();
//   const imageUrl = useRef();
//   const location =useRef();
//   const photographerDetails = useRef();
//   const videographerDetails = useRef();
//   const returnGift = useRef();
//   const themeCost = useRef();
//   const description = useRef();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  

//   const jwtToken = appUser?.token;
//   console.log("token", jwtToken);
//   const headers = {
//     Authorization: `Bearer ${jwtToken}`,
//   };
  
//   async function handleSubmit() {
//     console.log("i am handle submit");
//     const themeModel = {
//       themeName: themeName.current.value,
//       themeimgUrl: imageUrl.current.value,
//       location:location.current.value,
//       themephotographer: photographerDetails.current.value,
//       themeVideographer: videographerDetails.current.value,
//       themeReturnGift: returnGift.current.value,
//       cost: themeCost.current.value,
//       themeDescription: description.current.value,
//     };
//     console.log("theme for sending",themeModel)

//     try {
//       const res = await axios.post(`${BaseUrl}/admin/addTheme`,themeModel,{ headers });
//       console.log("return from backend", res.data);
//       alert(res.data);

//       // Refresh the data after adding the theme
//       getAllThemes();

//       // Reset the form fields
//       themeName.current.value = "";
//       imageUrl.current.value = "";
//       location.current.value="";
//       photographerDetails.current.value = "";
//       videographerDetails.current.value = "";
//       returnGift.current.value = "";
//       themeCost.current.value = "";
//       description.current.value = "";
//     } catch (e) {
//       console.log(e.message);
//     }
//   }
//   function openModal() {
//     setIsModalOpen(true);
//   }


//   const getAllThemes = async () => {
//     try {
//       const res = await axios.get(`${BaseUrl}/admin/theme`, { headers });
//       console.log("res",res.data);
      
//       // Reverse the data array to display the last entry first
//       const reversedData = res.data.reverse();

//       setData(reversedData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   //to fetch the data in starting  without it it will not fetch data
//   useEffect(() => {
//     getAllThemes();
//   }, []);

//     async function handleDelete(row) {
//     console.log(row);
//     try {
//       const res = await axios.delete(
//         `${BaseUrl}/admin/deleteTheme/${row.themeId}`, { headers }
//       );
//       const data = res.data;
//       console.log("res after delte", data);

//       setData((prevItems) =>
//         prevItems.filter((item) => item.themeId !== row.themeId)
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div className={styles.main_content}>
//         <div className={styles.container}>
//           <div className={styles.theme_form}>
//             <div className={styles.form}>
//               <input
//                 type="text"
//                 placeholder="Enter Theme Name"
//                 ref={themeName}
//               />
//               <input type="text" placeholder="Enter Image URL" ref={imageUrl} />
//               <input type="text" placeholder="Enter Location Details" ref={location} />
//               <input
//                 type="text"
//                 placeholder="Enter Photographer Details"
//                 ref={photographerDetails}
//               />
//               <div className={styles.add_btn_container}>
//                 <input
//                   type="submit"
//                   value="Add Theme"
//                   className={styles.add_btn}
//                   onClick={handleSubmit}
//                 />
//               </div>
//             </div>
//             <div className={styles.form}>
//               <input
//                 type="text"
//                 placeholder="Enter Videographer Details"
//                 ref={videographerDetails}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Theme Return Gift"
//                 ref={returnGift}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Theme Cost"
//                 ref={themeCost}
//               />
//               <textarea
//                 type="text"
//                 placeholder="Enter Theme Description"
//                 cols={20}
//                 rows={10}
//                 ref={description}
//               />
//             </div>
//           </div>
//           <div className={styles.themes_view}>
//             <div className={styles.card_scroll_view}>
//               {data?.map((item)=>{
//               return(
//                 <Card
//                 key={item.themeId}
//                     hoverable
//                     style={{
//                       width: 300,
//                     }}
//                     cover={
//                       <img
//                         alt="example"
//                         src={item.themeimgUrl}
//                       />
//                     }
//                     actions={[
//                       <EditOutlined key="edit" onClick={openModal}/>,
//                       <DeleteOutlined key="ellipsis" onClick={() => handleDelete(item)}/>,
//                     ]}
//                   >
//                     <Meta
//                       title={item.themeName}
//                       description={`₹ ${item.cost}`}
//                     />
//                   </Card>
//               )})}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal
//   isOpen={isModalOpen}
//   onRequestClose={() => setIsModalOpen(false)}
//   className={styles.modal} // Apply the 'modal' CSS class
//   overlayClassName={styles.modalOverlay}
// >
//   <div className={styles.modalContent}>
//     <h2 className={styles.modalTitle}>Edit Theme</h2>
//     <div className={styles.modalForm}>
//       <input
//         type="text"
//         placeholder="Enter Theme Name"
//         ref={themeName}
//         className={styles.modalInput}
//       />
//       <input
//         type="text"
//         placeholder="Enter Image URL"
//         ref={imageUrl}
//         className={styles.modalInput}
//       />
//       <input
//         type="text"
//         placeholder="Enter Location Details"
//         ref={location}
//         className={styles.modalInput}
//       />
//       <input
//         type="text"
//         placeholder="Enter Photographer Details"
//         ref={photographerDetails}
//         className={styles.modalInput}
//       />
//     </div>
//     <div className={styles.modalForm}>
//       <input
//         type="text"
//         placeholder="Enter Videographer Details"
//         ref={videographerDetails}
//         className={styles.modalInput}
//       />
//       <input
//         type="text"
//         placeholder="Enter Theme Return Gift"
//         ref={returnGift}
//         className={styles.modalInput}
//       />
//       <input
//         type="text"
//         placeholder="Enter Theme Cost"
//         ref={themeCost}
//         className={styles.modalInput}
//       />
//       <textarea
//         type="text"
//         placeholder="Enter Theme Description"
//         cols={20}
//         rows={10}
//         ref={description}
//         className={styles.modalTextarea}
//       />
//     </div>
//     <div className={styles.modalButtonContainer}>
//         <input
//           type="submit"
//           value="Save Changes"
//           className={styles.modalButton}
//           onClick={handleSubmit}
//         />
//       </div>
//   </div>
// </Modal>


//     </>
//   );
// };

// export default AddTheme;
import React, { useRef, useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./AddTheme.module.css";
import Modal from "react-modal";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const AddTheme = () => {
  const { appUser, setAppUserl } = useContext(UserContext);
  const [currentEditItem, setCurrentEditItem] = useState({})
  const themeNameRef = useRef();
  const imageUrlRef = useRef();
  const locationRef = useRef();
  const photographerDetailsRef = useRef();
  const videographerDetailsRef = useRef();
  const returnGiftRef = useRef();
  const themeCostRef = useRef();
  const descriptionRef = useRef();
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
      themeName: themeNameRef.current.value,
      themeimgUrl: imageUrlRef.current.value,
      location: locationRef.current.value,
      themephotographer: photographerDetailsRef.current.value,
      themeVideographer: videographerDetailsRef.current.value,
      themeReturnGift: returnGiftRef.current.value,
      cost: themeCostRef.current.value,
      themeDescription: descriptionRef.current.value,
    };
    console.log("theme for sending", themeModel);

    try {
      const res = await axios.post(`${BaseUrl}/admin/addTheme`, themeModel, { headers });
      console.log("return from backend", res.data);
      alert(res.data);

      // Refresh the data after adding the theme
      getAllThemes();

      // Reset the form fields
      themeNameRef.current.value = "";
      imageUrlRef.current.value = "";
      locationRef.current.value = "";
      photographerDetailsRef.current.value = "";
      videographerDetailsRef.current.value = "";
      returnGiftRef.current.value = "";
      themeCostRef.current.value = "";
      descriptionRef.current.value = "";
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
      console.log("res", res.data);

      // Reverse the data array to display the last entry first
      const reversedData = res.data.reverse();

      setData(reversedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the data when the component mounts
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
      console.log("res after delete", data);

      setData((prevItems) =>
        prevItems.filter((item) => item.themeId !== row.themeId)
      );
    } catch (e) {
      console.log(e);
    }
  }

  function handleEditButton(clickedItem){
    console.log("ITEM FROM edit function is here:,",clickedItem)
    setCurrentEditItem(clickedItem)
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
                ref={themeNameRef}
              />
              <input
                type="text"
                placeholder="Enter Image URL"
                ref={imageUrlRef}
              />
              <input
                type="text"
                placeholder="Enter Location Details"
                ref={locationRef}
              />
              <input
                type="text"
                placeholder="Enter Photographer Details"
                ref={photographerDetailsRef}
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
                ref={videographerDetailsRef}
              />
              <input
                type="text"
                placeholder="Enter Theme Return Gift"
                ref={returnGiftRef}
              />
              <input
                type="text"
                placeholder="Enter Theme Cost"
                ref={themeCostRef}
              />
              <textarea
                type="text"
                placeholder="Enter Theme Description"
                cols={20}
                rows={10}
                ref={descriptionRef}
              />
            </div>
          </div>
          <div className={styles.themes_view}>
            <div className={styles.card_scroll_view}>
              {data?.map((item) => {
                return (
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
                      <EditOutlined key="edit" onClick={()=>{
                        console.log("edit clicked item is",item)
                        setIsModalOpen(true)
                        handleEditButton(item)
                      }} />,
                      <DeleteOutlined key="ellipsis" onClick={() => handleDelete(item)} />,
                    ]}
                  >
                    <Meta
                      title={item.themeName}
                      description={`₹ ${item.cost}`}
                    />
                  </Card>
                )
              })}
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
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Edit Theme</h2>
          <div className={styles.modalForm}>
            <input
              type="text"
              placeholder="Enter Theme Name"
              ref={themeNameRef}
              className={styles.modalInput}
              value={currentEditItem?.themeName}
            />
            <input
              type="text"
              placeholder="Enter Image URL"
              ref={imageUrlRef}
              className={styles.modalInput}
              value={currentEditItem?.themeimgUrl}
            />
            <input
              type="text"
              placeholder="Enter Location Details"
              ref={locationRef}
              className={styles.modalInput}
              value ={currentEditItem?.location}
            />
            <input
              type="text"
              placeholder="Enter Photographer Details"
              ref={photographerDetailsRef}
              className={styles.modalInput}
              value ={currentEditItem?.themephotographer}
            />
          </div>
          <div className={styles.modalForm}>
            <input
              type="text"
              placeholder="Enter Videographer Details"
              ref={videographerDetailsRef}
              className={styles.modalInput}
              value = {currentEditItem?.themeVideographer}
            />
            <input
              type="text"
              placeholder="Enter Theme Return Gift"
              ref={returnGiftRef}
              className={styles.modalInput}
              value = {currentEditItem?.themeReturnGift}
            />
            <input
              type="text"
              placeholder="Enter Theme Cost"
              ref={themeCostRef}
              className={styles.modalInput}
              value = {currentEditItem?.cost}
            />
            <textarea
              type="text"
              placeholder="Enter Theme Description"
              cols={20}
              rows={10}
              ref={descriptionRef}
              className={styles.modalTextarea}
              value = {currentEditItem?.themeDescription}
            />
          </div>
          <div className={styles.modalButtonContainer}>
            <input
              type="submit"
              value="Save Changes"
              className={styles.modalButton}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddTheme;
