import { useEffect, useState } from "react";
import { createUserApi, updateUserApi } from "../service/api";
import { App, Input, Modal } from "antd";
interface IProp {
    openUpdateModel: boolean;
    setOpenUpdateModel : ( v : boolean) => void 
    fetchUser:any;
     dateUpdate: {
        id :number,
        name:string ,
        email:string ,
        address:string

    }  | null ;
    setDataUpdate:any

}
const UpdateUserModal = (props :IProp) => {
    const { message } = App.useApp();
    // Lay bien openUpdateModel
    const{openUpdateModel,setOpenUpdateModel,fetchUser,dateUpdate,setDataUpdate} = props;
    // 3 thuoc tinh 
    const [name,setName] = useState<string>(" ");
    const [email,setEmail] = useState<string>(" ");
    const [address,setAddress] = useState<string>(" ");
  

    useEffect(() => {
        if (dateUpdate) {
            setName(dateUpdate.name)
            setEmail(dateUpdate.email)
            setAddress(dateUpdate.address)
        }

    },[dateUpdate])
     
    
const handleSubmit =  async() => {
    if (dateUpdate){
        const res = await updateUserApi(dateUpdate.id ,name,email,address);
        message.success("Update user successfully")
        // close Model
        setOpenUpdateModel(false)
        // reset 3 thuoc tinh
        setName(" ")
        setEmail(" ")
        setAddress(" ")
        setDataUpdate(null)
        await fetchUser()

    }
        
     }
    
     
    
    return (

       <Modal
        title="Update a new user"
        maskClosable={false}
        open={openUpdateModel}
        onOk={handleSubmit}
        onCancel={() =>  {setOpenUpdateModel(false)
            setDataUpdate(null)
        }}
        okText="Update"
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
export default UpdateUserModal ;