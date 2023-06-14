import React, { useEffect,useContext } from "react";
import { BaseUrl } from "../../../utils/authApi";
import Navbar from "/home/coder/project/workspace/reactapp/src/components/Admin/Navbar/Navbar.js";
import Modal from "react-modal";
import "./AddMenu.css";
import axios from "axios";
import UserContext from "../../../UserContext";


import DataTable from "react-data-table-component";

export default function FoodMenu() {
  const { appUser, setAppUserl } = useContext(UserContext);
  const [newItem, setNewItem] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemsArray, setItemsArray] = React.useState([]);
  const [editingRow, setEditingRow] = React.useState(null);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = React.useState(false);

  const jwtToken = appUser?.token;
  console.log("token",jwtToken);
  const headers = {
    Authorization: `Bearer ${jwtToken}` ,
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
        `${BaseUrl}/admin/editMenu/${editedItem.foodMenuId}`,
        editedItem,{headers}
      );
      const data = res.data;
      console.log("editi", data);
      setEditingRow(null);
      setIsEditItemModalOpen(false);
    } catch (e) {
      console.log(e);
    }

    setEditingRow(null);
  }

  async function handleDelete(row) {
    console.log(row);
    try {
      const res = await axios.delete(
        `${BaseUrl}/admin/deleteMenu/${row.foodMenuId}`,{headers}
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.foodMenuId,
      style: {
        width:'10px',
    },
    },
    {
      name: "Name",
      selector: (row) => <h1>{row.foodMenuItems}</h1>,
    },
    {
      name: "Price",
      selector: (row) => <h1>{row.foodMenuCost}</h1>,
    },
    {
      name: "Category",
      selector: (row) => <h1>{row.foodMenuType}</h1>,
    },
    {
      name: "Image",
      cell: (row) => (
        <img src={row.imageUrl} alt="Food" style={{ width: "200px" }} />
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          onClick={() => {
            handleEdit(row);
          }}
        >
          Edit
        </button>
      ),
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => <button onClick={() => handleDelete(row)}>Delete</button>,
      button: true,
    },
  ];

  // //  get all items food menu items
  useEffect(() => {
    async function getAllItems() {
      try {
        const res = await axios.get(`${BaseUrl}/admin/getMenu`,{headers});
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
      const res = await axios.post(`${BaseUrl}/admin/addMenu`, item,{headers});
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
    <div class="container">
        <Navbar />
      <div className="add-item">
        <p className="add-item-text">For adding a new Item, click here: </p>
      
        <p>
          <button className="add-item-button" onClick={openModal}>
            Add Item
          </button>
        </p>
      </div>

      <Modal isOpen={isModalOpen}>
        <h2 style={{ color: "#a921e4" }}>Add New Item</h2>
        <div className="new-item-container">
          <div>
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={handleChange}
              className="rounded-input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              className="rounded-input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="price"
              name="price"
              onChange={handleChange}
              className="rounded-input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="category"
              name="category"
              onChange={handleChange}
              className="rounded-input"
            />
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
                <div><h2 style={{ color: "#a921e4" }}>Edit record</h2></div>
              <input
                type="text"
                name="foodMenuItems"
                value={editingRow.foodMenuItems}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    foodMenuItems: e.target.value,
                  }))
                }
                className="custom-input"
              />
              <input
                type="text"
                name="foodMenuCost"
                value={editingRow.foodMenuCost}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    foodMenuCost: e.target.value,
                  }))
                }
                className="custom-input"
              />
              <input
                type="text"
                name="foodMenuType"
                value={editingRow.foodMenuType}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    foodMenuType: e.target.value,
                  }))
                }
                className="custom-input"
              />
              <input
                type="text"
                name="imageUrl"
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

        {itemsArray.length === 0 ? (
          <div> No items found </div>
        ) : (
          <DataTable columns={columns} data={itemsArray}></DataTable>
        )}
      </div>
    </div>
  );
}
