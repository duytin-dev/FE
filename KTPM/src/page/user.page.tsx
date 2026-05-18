import { Button, Table ,Popconfirm, message} from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios  from "axios"
import CreateUserModal from "../modal/create.user.modal";
import {deleteUserApi, getUsersApi} from "../service/api";
import UpdateUserModal from "../modal/update.user.modal";


interface IUser {
    id:number;
    name:string;
    email:string;
    address:string;
}
const UserPage = () => {
  //Model
  const[openCreateModel,setOpenCreateModel] = useState<boolean>(false);
  //UPdate
  const[openUpdateModel,setOpenUpdateModel] = useState<boolean>(false);
    // Dùng để lưu dữ liệu (state) và làm UI tự cập nhật khi dữ liệu thay đổi
    const[users,setUsers] = useState<IUser[]>([]);
      const fetchUser = async () => {
        // await : Vi func axios tra 1 obj promise , nen can cho cho no thuc thi
        const res = await getUsersApi();
        setUsers(res.data)
      }
        const [dataUpdate ,setDataUpdate] = useState<IUser | null >(null)

    //Dùng để chạy code sau khi component render,[] chi chay 1 lan
    useEffect(() => {
       fetchUser();
    },[])


  const handleClickEdit = (data:IUser) => {
    setDataUpdate(data)
    setOpenUpdateModel(true)
  }
   const handleClickDelete = async (data:IUser) => {
   
    const res = await deleteUserApi(data.id);
    if (res.data){
      message.success("Delete user successfully");
       await fetchUser()
    }

    
  }
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
   
  },
  {
    title: 'Name',
    dataIndex: 'name',
    
  },
  {
    title: 'Email',
    dataIndex: 'email',
   
  },
  {
    title: 'Address',
    dataIndex: 'address',
   
  },
  {
    title:"Action",
    render: (_:string,record: IUser) => {
      //  console.log( "check" , _);
      return (<> 
      <EditOutlined 
      onClick={() => handleClickEdit(record)}
      style={{ cursor:"pointer" ,
       color:"orange",
       marginRight: 10 }}/>
 
 <Popconfirm
        title="Delete the user "
        description="Are you sure to delete this user?"
         onConfirm={() => handleClickDelete(record)}
        // onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
      <DeleteOutlined
       style={{cursor:"pointer" ,
        color:"red",
        marginRight: 10 }}/>
      </Popconfirm>
      
        
        
        
        </>)
    }
  },
];

return (
  
    <div style={{padding: 10 }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         <div><h3>Table User :</h3></div>
      <Button 
      type="primary" 
      icon={<PlusCircleOutlined/>}
      onClick={() => setOpenCreateModel(true)}
      >
        Add User</Button>
      </div>
     
        <Table dataSource={users} columns={columns}  rowKey={"id"}/>
        <CreateUserModal
         openCreateModel={openCreateModel}
         setOpenCreateModel={setOpenCreateModel}
         fetchUser={fetchUser}
        />
        <UpdateUserModal
          openUpdateModel={openUpdateModel}
         setOpenUpdateModel={setOpenUpdateModel}
         fetchUser={fetchUser}
         dateUpdate={dataUpdate}
         setDataUpdate = {setDataUpdate}
        />
    </div>

)



}
export default UserPage;