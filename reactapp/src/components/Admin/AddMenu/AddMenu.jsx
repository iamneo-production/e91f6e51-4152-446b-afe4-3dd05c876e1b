import React, { useEffect, useContext } from "react";
import { BaseUrl } from "../../../utils/authApi";
import Navbar from "../Navbar/Navbar"
import Modal from "react-modal";
import "./AddMenu.css";
import axios from "axios";
import UserContext from "../../../UserContext";
import { Card, FloatButton } from 'antd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteIcon from '@mui/icons-material/Delete';
//commit
// import DataTable from "react-data-table-component";

import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';


export default function FoodMenu() {
  const { appUser, setAppUserl } = useContext(UserContext);
  const [newItem, setNewItem] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemsArray, setItemsArray] = React.useState([]);
  const [editingRow, setEditingRow] = React.useState(null);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = React.useState(false);
  const { Meta } = Card;


  const jwtToken = appUser?.token;
  console.log("token", jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };


  async function handleEdit(row) {
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
      const res = await axios.put(
        `${BaseUrl}/admin/editMenu/${editedItem.foodMenuId}`, editedItem, { headers });
      const updatedData = itemsArray.map((item) => {
        if (item.addOnId === editedItem.addOnId) {
          return editedItem;
        }
        return item;
      });
      console.log("editi", res.data);
      setEditingRow(null);
      setItemsArray(updatedData);
      setIsEditItemModalOpen(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }

    setEditingRow(null);
  }

  async function handleDelete(row) {
    console.log(row);
    try {
      const res = await axios.delete(
        `${BaseUrl}/admin/deleteMenu/${row.foodMenuId}`, { headers }
      );
      const data = res.data;
      console.log("res after delte", data);

      setItemsArray((prevItems) =>
        prevItems.filter((item) => item.foodMenuId !== row.foodMenuId)
      );
    } catch (e) {
      console.log(e);
    }
  }

  // const columns = [
  // {
  //   name: "Id",
  //   selector: (row) => row.foodMenuId,
  //   style: {
  //     width:'10px',
  // },
  // },
  //   {
  //     name: "Image",
  //     cell: (row) => (
  //       <img src={row.imageUrl} alt="Food" style={{ width: "200px" }} className="image_add_menu" />
  //     ),
  //   },
  //   {
  //     name: "Name",
  //     selector: (row) => <h1 className="row_values">{row.foodMenuItems}</h1>,
  //   },
  //   {
  //     name: "Price",
  //     selector: (row) => <h1 className="row_values">₹{row.foodMenuCost}</h1>,
  //   },
  //   {
  //     name: "Category",
  //     selector: (row) => <h1 className="row_values">{row.foodMenuType}</h1>,
  //   },
  //   {
  //     name: "Edit",
  //     cell: (row) => (
  //       <button
  //         onClick={() => {
  //           handleEdit(row);
  //         }}
  //         className="add-item-button"
  //       >
  //         <ModeEditIcon />
  //       </button>
  //     ),
  //     button: true,
  //   },
  //   {
  //     name: "Delete",
  //     cell: (row) => <button onClick={() => handleDelete(row)} className="add-item-button"><DeleteIcon /></button>,
  //     button: true,
  //   },
  // ];

  // //  get all items food menu items
  useEffect(() => {
    async function getAllItems() {
      try {
        const res = await axios.get(`${BaseUrl}/admin/menu`, { headers });
        const data = res.data;
        console.log("all items ", data);
        setItemsArray(data);
      } catch (e) {
        console.log(e);
      }
    }
    getAllItems();
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }
  function handleChange(e) {
    const { name, value } = e.target;

    setNewItem((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // add item to array
  async function addNewItem() {
    const item = {
      foodMenuType: newItem.category,
      foodMenuItems: newItem.name,
      foodMenuCost: newItem.price,
      imageUrl: newItem.imageUrl,
    };

    try {
      const res = await axios.post(`${BaseUrl}/admin/addMenu`, item, { headers });
      console.log(res.data);
      console.log(res.status);

      console.log("ading item to state");
      setItemsArray((prev) => {
        return [...prev, item];
      });
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div class="add-menu-container">
      <Navbar />
      {/* <div className="add-item">
        <p className="add-item-text">For adding a new Item, click here: </p>

        <p>
          <button className="add-item-button" onClick={openModal}>
            Add Item
          </button>
        </p>
      </div> */}

      <Modal isOpen={isModalOpen}>
        <h2 style={{ color: "#a921e4" }}>Add New Item</h2>
        <div className="input-tags-container_addMenu">
          <div className="inputs_addMenu">
            <div>
              <TextField
                className="rounded-input"
                type="text"
                placeholder="Enter name"
                variant="outlined"
                size="small"
                label="Name"
                name="name"
                onChange={handleChange}
                sx={{
                  width: "100%"
                }}
              />
            </div>
            <div>
              <TextField
                className="rounded-input"
                type="text"
                placeholder="Enter category"
                variant="outlined"
                label="Category"
                name="category"
                size="small"
                onChange={handleChange}
                sx={{
                  width: "100%"
                }}
              />
            </div>
            <div>
              <TextField
                type="text"
                label="Price"
                placeholder="Enter price"
                name="price"
                size="small"
                onChange={handleChange}
                className="rounded-input"
                sx={{
                  width: "100%"
                }}
              />
            </div>
            <div>
              <TextField
                type="text"
                label="Image-URL"
                placeholder="Enter image-Url"
                name="imageUrl"
                size="small"
                onChange={handleChange}
                className="rounded-input"
                sx={{
                  width: "100%"
                }}
              />
            </div>
          </div>
        </div>
        <div className="new-item-buttons-container">
          <button onClick={addNewItem}>Add new item</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            close
          </button>
        </div>
      </Modal>
      <div>
        <Modal isOpen={isEditItemModalOpen}>
          {editingRow && (
            <div className="custom-item-container">
              <div><h2 style={{ color: "#a921e4", textAlign: 'center' }}>Edit record</h2></div>
              <TextField
                type="text"
                name="foodMenuItems"
                variant="outlined"
                size="small"
                label="Name"
                placeholder="Enter name"
                value={editingRow.foodMenuItems}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    foodMenuItems: e.target.value,
                  }))
                }
                className="custom-input"
              />
              <TextField
                type="text"
                name="foodMenuCost"
                variant="outlined"
                size="small"
                label="Price"
                placeholder="Enter price"
                value={editingRow.foodMenuCost}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    foodMenuCost: e.target.value,
                  }))
                }
                className="custom-input"
              />
              <TextField
                type="text"
                name="foodMenuType"
                variant="outlined"
                size="small"
                label="Category"
                placeholder="Enter Category"
                value={editingRow.foodMenuType}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    foodMenuType: e.target.value,
                  }))
                }
                className="custom-input"
              />
              <TextField
                type="text"
                name="imageUrl"
                variant="outlined"
                size="small"
                label="Image-URL"
                placeholder="Enter ImageURL"
                value={editingRow.imageUrl}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    imageUrl: e.target.value,
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

        <div className="cards_container">
          {itemsArray.length === 0 ? (
            <div> No items found </div>
          ) : (
            itemsArray.map((item) => {
              return (
                <div className="card_items">
                  <Card
                    hoverable
                    style={{
                      width: 320,
                    }}
                    cover={
                      <img
                        alt="example"
                        src={item.imageUrl}
                      />
                    }
                    actions={[
                      <EditOutlined key="edit" onClick={() => { handleEdit(item); }} />,
                      <DeleteOutlined key="ellipsis" onClick={() => handleDelete(item)} />,
                    ]}
                  >
                    <Meta
                      title={item.foodMenuItems}
                      description={'₹' + item.foodMenuCost + ' ' + item.foodMenuType}
                    />
                  </Card>
                </div>
              )
            })

          )}
        </div>
      </div>
      {/* <FloatButton onClick={openModal} icon={<PlusOutlined width={70}/>} tooltip={<div>Add Food</div>}/> */}
      <div className="admin-add-menu-button" onClick={openModal}>
        <div className='admin-menu-icon' >
          <i className="fa-solid fa-circle-plus"></i>
        </div>
      </div>
    </div>
  );
}
