import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import Modal from "react-modal";
import AddOnCard from "/home/coder/project/workspace/reactapp/src/components/Admin/AddOns/AddOnCard.jsx";
import { BaseUrl } from "../../../utils/authApi";
import Navbar from "../Navbar/Navbar"
import "./AddOn.css";
import UserContext from '../../../UserContext'
export default function AddOn() {
  const [data, setData] = useState([]);
  const {appUser,setAppUser} =useContext(UserContext);
  const [addOnItem, setaddOnItem] = useState({
    addOnName: "",
    addOnDescription: "",
    addOnPrice: "",
    imgUrlAddons: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const jwtToken = appUser?.token;
  console.log("token",jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}` ,
  };
  useEffect(() => {
    async function getAddons() {
      try{
        const res = await axios.get(`${BaseUrl}/admin/getAddon`,{headers});
        console.log(res.data);
        setData(res.data);
      
      }catch(e){
        console.log(e)
      }
    }
    getAddons();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setaddOnItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function openModal() {
    setIsModalOpen(true);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BaseUrl}/admin/addAddon`,
        addOnItem,
        {headers}
      );
      console.log(res.data);
      setIsModalOpen(false);
      alert("Added")
      setData((prev) => {
        return [...prev, res.data];
      });
    } catch (e) {
      console.log(e);
    }
  }

  const addOnCards = data.map((singleCard) => {
    return <AddOnCard singleCard={singleCard} key={singleCard.addOnId} />;
  });

  return (
    <div>
      <Navbar/>
      <div className="AddOnButton">
      <div onClick={openModal}>Add AddOns</div>
      </div>
      <Modal isOpen={isModalOpen}>
        <h2>Add new Add-on</h2>
        

        <div className="input-tags-container">
          <div>
            <input
              type="text"
              placeholder="Name"
              name="addOnName"
              value={addOnItem.addOnName}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Description"
              name="addOnDescription"
              value={addOnItem.addOnDescription}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Price"
              name="addOnPrice"
              value={addOnItem.addOnPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="imgUrl"
              name="imgUrlAddons"
              value={addOnItem.imgUrlAddons}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="AddnewButton">
          <button onClick={handleSubmit}>Add-new Addon</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>

      
      <div className="grid-container">{data.length === 0 ? "No data found Please add asome data":addOnCards}</div>
    </div>
  );
}