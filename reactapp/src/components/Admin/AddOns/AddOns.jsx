import axios from 'axios';
import React,{useState} from 'react'
import Modal from 'react-modal'
import "./AddOn.css";
import Navbar from "/home/coder/project/workspace/reactapp/src/components/Admin/Navbar/Navbar.js";

export default function AddOn() {

    const [addOnItem ,setaddOnItem] = useState({
        addOnName:"",
        addOnDescription:"",
        addOnPrice:"",
        imgUrlAddons:""
})


    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleChange(e){
        const {name,value} = e.target;
        setaddOnItem((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    function openModal(){
        setIsModalOpen(true)
    }
   async function handleSubmit(e){
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:8080/admin/addAddon",addOnItem)
            console.log(res.data)
        }catch(e){
            console.log(e)
        }
       
    }

  return (
    <div>
      <Navbar />
      <button onClick={openModal} >Add ons</button>
      <Modal isOpen={isModalOpen} >

      <h2>Add new Add-on</h2>
           
           <div className='input-tags-container' >
                <div>
                    <input
                        type='text'
                        placeholder='Name'
                        name='addOnName'
                        value={addOnItem.addOnName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Description'
                        name='addOnDescription'
                        value={addOnItem.addOnDescription}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Price'
                        name='addOnPrice'
                        value={addOnItem.addOnPrice}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='imgUrl'
                        name='imgUrlAddons'
                        value={addOnItem.imgUrlAddons}
                        onChange={handleChange}
                    />
                </div>
           </div>
           <div>
           <button onClick={handleSubmit} >
            Addon
           </button>
           <button onClick={()=>{
                setIsModalOpen(false)
            }} >Close</button>
           </div>
           
      </Modal>
    </div>
  )
}