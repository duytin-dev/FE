import { App, Modal } from "antd"
import {Input} from "antd"
import { useState } from "react"
import { createUserApi } from "../service/api"
interface IProps {
    openCreateModel: boolean
    setOpenCreateModel : ( v: boolean) => void
    fetchUser: any
}
const CreateUserModal = (props:IProps) => {
    const { message } = App.useApp();
    // Lay bien openCreateModel
    const{openCreateModel,setOpenCreateModel,fetchUser} = props;
    // 3 thuoc tinh 
    const [name,setName] = useState<string>(" ");
    const [email,setEmail] = useState<string>(" ");
    const [address,setAddress] = useState<string>(" ");
     const handleSubmit =  async() => {
        const res = await createUserApi(name,email,address);
        message.success("Create user successfully")
        // close Model
        setOpenCreateModel(false)
        // reset 3 thuoc tinh
        setName(" ")
        setEmail(" ")
        setAddress(" ")
        await fetchUser()

     }
    
    return (

       <Modal
        title="Create a new user"
        maskClosable={false}
        open={openCreateModel}
        onOk={handleSubmit}
        onCancel={() => setOpenCreateModel(false)}
        okText="Save"
      >
        <div style={{display:"flex",flexDirection:"column",gap: 10,marginBottom:15}} >
            <span>Name:</span>
            <Input value={name} onChange={(event) =>  setName(event.target.value)}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap: 10,marginBottom:15}} >
            <span>Email:</span>
            <Input value={email} onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap: 10}} >
            <span>Address:</span>
            <Input value={address} onChange={(event) => setAddress(event.target.value)}/>
        </div>
       
        
      </Modal>
    )

    }
    export default CreateUserModal;
    
