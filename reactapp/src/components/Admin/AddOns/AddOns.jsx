import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AddOnCard from "/home/coder/project/workspace/reactapp/src/components/Admin/AddOns/AddOnCard.jsx";
import { BaseUrl } from "../../../utils/authApi";

export default function AddOn() {
  const [data, setData] = useState([]);

  const [addOnItem, setaddOnItem] = useState({
    addOnName: "",
    addOnDescription: "",
    addOnPrice: "",
    imgUrlAddons: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getAddons() {
      const res = await axios.get(`${BaseUrl}/admin/getAddon`);
      console.log(res.data);
      setData(res.data);
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
      const res = await axios.post(`${BaseUrl}/admin/getAddon`,addOnItem);
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
      <button onClick={openModal}>Add ons</button>
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
        <div>
          <button onClick={handleSubmit}>Addon</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>

      {data.length === 0 
                        ? "No data found" 
                        : addOnCards
      }
    </div>
  );
}