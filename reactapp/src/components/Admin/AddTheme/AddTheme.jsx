import { React, useRef, useState, useContext } from "react";
import Navbar from "/home/coder/project/workspace/reactapp/src/components/Admin/Navbar/Navbar.js";
import styles from  "/home/coder/project/workspace/reactapp/src/components/Admin/AddTheme/AddTheme.module.css";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";
import UserContext from "../../../UserContext";

const AddTheme = () => {
  const { appUser, setAppUserl } = useContext(UserContext);
  const themeName =useRef();
  const imageUrl =useRef();
  const photographerDetails =useRef();
  const videographerDetails =useRef();
  const returnGift =useRef();
  const themeCost =useRef();
  const description =useRef();

  const [data,setData]=useState();

 async function handleSubmit(){
  console.log("i am handle submit")
        const themeModel={
          "themeName":themeName.current.value,
          "themeimgUrl":imageUrl.current.value,
          "themephotographer":photographerDetails.current.value,
          "themeVideographer":videographerDetails.current.value,
          "themeReturnGift":returnGift.current.value,
          "cost":themeCost.current.value,
          "themeDescription":description.current.value
        }

        try{
          const jwtToken = appUser.token;
          console.log("token",jwtToken);
          const headers = {
            Authorization: `Bearer ${jwtToken}` ,
          };
            const res = await axios.post(`${BaseUrl}/admin/addTheme`,themeModel,{headers})
          
        console.log(res.data)
        themeName.current.value =""
        imageUrl.current.value=""
        photographerDetails.current.value=""
       videographerDetails.current.value=""
        returnGift.current.value=""
        themeCost.current.value=""
       description.current.value=""

        alert(res.data)
        

        }catch(e){
          console.log(e.message)
        }
        
     
  }


  return (
    
     <>
     <Navbar />
      <div className={styles.main_content}>
        
        <div className={styles.container}>
          <div className={styles.theme_form}>
            <div className={styles.form}>
              <input type="text" placeholder="Enter Theme Name" ref={themeName}/>
              <input type="text" placeholder="Enter Image URL" ref={imageUrl}/>
              <input type="text" placeholder="Enter Photographer Details" ref={photographerDetails}/>
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
              <input type="text" placeholder="Enter Videographer Details" ref={videographerDetails}/>
              <input type="text" placeholder="Enter Theme Return Gift" ref={returnGift}/>
              <input type="text" placeholder="Enter Theme Cost" ref={themeCost}/>
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
              <div className={styles.card}>
                <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" alt="" />
                <div className={styles.event_details}>
                  <p className={styles.event_text}>{"Birthday Event"}</p>
                  <div className={styles.event_details_place}>
                    <p className={styles.event_text}>{"place:Chennai IT"}</p>
                    <p className={styles.event_text}>{"5Star"}</p>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" alt="" />
                <div className="">
                  <p>{"Birthday Event"}</p>
                  <div className="">
                    <p>{"place:Chennai"}</p>
                    <p>{"5Star"}</p>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" alt="" />
                <div className="">
                  <p>{"Birthday Event"}</p>
                  <div className="">
                    <p>{"place:Chennai"}</p>
                    <p>{"5Star"}</p>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <img src="" alt="" />
                <div className="">
                  <p>{"Birthday Event"}</p>
                  <div className="">
                    <p>{"place:Chennai"}</p>
                    <p>{"5Star"}</p>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <img src="" alt="" />
                <div className="">
                  <p>{"Birthday Event"}</p>
                  <div className="">
                    <p>{"place:Chennai"}</p>
                    <p>{"5Star"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTheme;