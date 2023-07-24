import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { BaseUrl } from "../../../utils/authApi";
import Navbar from "../Navbar/Navbar"
import "./AddOn.css";
import UserContext from '../../../UserContext'
import { Card } from 'antd';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AddOn() {
  const [data, setData] = useState([]);
  const { appUser, setAppUser } = useContext(UserContext);
  const { Meta } = Card;
  const [addOnItem, setaddOnItem] = useState({
    addOnName: "",
    addOnDescription: "",
    addOnPrice: "",
    imgUrlAddons: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = React.useState(null);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = React.useState(false);

  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  async function AddonEdit(row) {
    setIsEditItemModalOpen(true);
    console.log(row);
    setEditingRow(row);
  }

  async function handleSave(e) {
    const editedItem = {
      ...editingRow,
    };
    console.log("edited item object is:", editedItem);
    try {
      const res = await axios.put(`${BaseUrl}/admin/editAddon/${editedItem.addOnId}`, editedItem, { headers });
      const updatedData = data.map((item) => {
        if (item.addOnId === editedItem.addOnId) {
          return editedItem;
        }
        return item;
      });
      console.log("editi", res.data);
      setData(updatedData);
      setIsEditItemModalOpen(false);
    } catch (e) {
      console.log(e);
    }

    setEditingRow(null);

  }

  useEffect(() => {
    async function getAddons() {
      try {
        const res = await axios.get(`${BaseUrl}/admin/add-on`, { headers });
        console.log(res.data);
        setData(res.data);

      } catch (e) {
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
      const res = await axios.post(`${BaseUrl}/admin/addAddon`, addOnItem, { headers });
      console.log(res.data);
      console.log(res.status);
      setData((prev) => {
        return [...prev, addOnItem];
      });

      setIsModalOpen(false);
      alert("Added")

    } catch (e) {
      console.log(e);
    }
  }

  async function DeleteAddOn(row) {
    console.log(row);
    try {
      const res = await axios.delete(
        `${BaseUrl}/admin/deleteAddOn/${row.addOnId}`, { headers }
      );
      const data = res.data;
      console.log("res after delte", data);

      setData((prevItems) =>
        prevItems.filter((item) => item.addOnId !== row.addOnId)
      );
    } catch (e) {
      console.log(e);
    }
  }

  // const addOnCards = data.map((singleCard) => {
  //   return <AddOnCard singleCard={singleCard} key={singleCard.addOnId} />;
  // });

  return (
    <div className="add-on-container">
      <Navbar />

      <Modal isOpen={isModalOpen}>
        <div><h2 style={{ color: "#a921e4", textAlign: 'center' }}>Add new Add-on</h2></div>
        <div className="input-tags-container">
          <div>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label="Name"
              placeholder="Enter Name"
              name="addOnName"
              value={addOnItem.addOnName}
              onChange={handleChange}
              className="input_field_addons"
              data-testid="addOnName"
              sx={{
                width: "100%",
              }}
            />
          </div>

          <div>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label="Description"
              placeholder="Enter Description"
              name="addOnDescription"
              value={addOnItem.addOnDescription}
              onChange={handleChange}
              className="input_field_addons"
              data-testid="addAddOns"
              sx={{
                width: "100%"
              }}
            />
          </div>
          <div>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label="Price"
              placeholder="Enter Price"
              name="addOnPrice"
              value={addOnItem.addOnPrice}
              onChange={handleChange}
              className="input_field_addons"
              sx={{
                width: "100%",
                mt: -1
              }}
            />
          </div>
          <div>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label="Image-URL"
              placeholder="Enter imgUrl"
              name="imgUrlAddons"
              value={addOnItem.imgUrlAddons}
              onChange={handleChange}
              className="input_field_addons"
              sx={{
                width: "100%",
                mt: -1, mb: -1,

              }}
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

      <Modal isOpen={isEditItemModalOpen}>
        {editingRow && (
          <div className="custom-item-container">
            <div><h2 style={{ color: "#a921e4", textAlign: 'center' }}>Edit record</h2></div>
            <TextField
              type="text"
              name="addOnName"
              variant="outlined"
              size="small"
              label="Name"
              value={editingRow.addOnName}
              onChange={(e) =>
                setEditingRow((prevRow) => ({
                  ...prevRow,
                  addOnName: e.target.value,
                }))
              }
              className="custom-input"
            />
            <TextField
              type="text"
              name="addOnPrice"
              variant="outlined"
              size="small"
              label="Price"
              value={editingRow.addOnPrice}
              onChange={(e) =>
                setEditingRow((prevRow) => ({
                  ...prevRow,
                  addOnPrice: e.target.value,
                }))
              }
              className="custom-input"
            />
            <TextField
              type="text"
              name="addOnDescription"
              variant="outlined"
              size="small"
              label="Description"
              value={editingRow.addOnDescription}
              onChange={(e) =>
                setEditingRow((prevRow) => ({
                  ...prevRow,
                  addOnDescription: e.target.value,
                }))
              }
              className="custom-input"
            />
            <TextField
              type="text"
              name="imgUrlAddons"
              variant="outlined"
              size="small"
              label="Image-URL"
              value={editingRow.imgUrlAddons}
              onChange={(e) =>
                setEditingRow((prevRow) => ({
                  ...prevRow,
                  imgUrlAddons: e.target.value,
                }))
              }
              className="custom-input"
            />
            <div className="custom-buttons-container">
              <button onClick={() => handleSave(editingRow)}>Save</button>
              <button onClick={() => setIsEditItemModalOpen(false)}>
                Close Modal
              </button>
            </div>
          </div>
        )}
      </Modal>


      {/* <div className="grid-container">{data.length === 0 ? "No data found Please add asome data":addOnCards}</div> */}
      <div className="cards_container">
        {data.length === 0 ? (
          <div> No items found </div>
        ) : (
          data.map((item) => {
            return (
              <div className="card_items">
                <Card
                  hoverable
                  style={{
                    width: 300,
                  }}
                  cover={
                    <img
                      alt="example"
                      src={item.imgUrlAddons}
                    />
                  }
                  actions={[
                    <EditOutlined key="edit" onClick={() => { AddonEdit(item); }} />,
                    <DeleteOutlined key="ellipsis" onClick={() => DeleteAddOn(item)} />,
                  ]}
                >
                  <Meta
                    title={item.addOnName}
                    description={'₹' + item.addOnPrice + ' ' + item.addOnDescription}
                  />
                </Card>
              </div>
            )
          })

        )}
      </div>
      {/* <FloatButton onClick={openModal} icon={<PlusOutlined width={70}/>} tooltip={<div>Add AddOns</div>}/> */}
      <div className="admin-add-on-button" onClick={openModal}>
        <div className='admin-add-on-icon' >
          <i className="fa-solid fa-circle-plus"></i>
        </div>
      </div>
    </div>

  );
}