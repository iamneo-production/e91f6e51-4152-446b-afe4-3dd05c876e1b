import { React, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./AddTheme.module.css";
import { BaseUrl } from "../../../utils/authApi";
import axios from "axios";

const AddTheme = () => {
  const themeName = useRef();
  const imageUrl = useRef();
  const photographerDetails = useRef();
  const videographerDetails = useRef();
  const returnGift = useRef();
  const themeCost = useRef();
  const description = useRef();

  const [data, setData] = useState();

  async function handleSubmit() {
    console.log("i am handle submit");
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
      const res = await axios.post(`${BaseUrl}/admin/addTheme`, themeModel);

      console.log(res.data);
      themeName.current.value = "";
      imageUrl.current.value = "";
      photographerDetails.current.value = "";
      videographerDetails.current.value = "";
      returnGift.current.value = "";
      themeCost.current.value = "";
      description.current.value = "";

      alert(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  useEffect(() => {
    const getAllThemes = async () => {
      const res = await axios.get(
        "https://8080-fbfbcfdafefbdecbeaedcfdfabbdb.project.examly.io/admin/getTheme"
      );
      console.log(res.data);
      setData(res.data);
    };
    getAllThemes();
  }, []);

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
              <div className={styles.card} key={item.themeId}>
                <img
                  src={item.themeimgUrl}
                  alt=""
                />
                <div className="">
                  <p>{item.themeName}</p>
                  <div className="">
                    <p>{`price:${item.cost}`}</p>
                    <p>{"5 star"}</p>
                  </div>
                </div>
              </div>)})}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTheme;