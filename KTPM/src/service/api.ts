import  axios  from 'axios';

const getUsersApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return  axios.get(url);
}
const createUserApi = (name:string ,email:string ,address:string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`
    return axios.post(url,{name,email,address});
}
const updateUserApi = (id : number ,name:string ,email:string ,address:string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
    return axios.put(url,{name,email,address});
}
const deleteUserApi = (id:number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
    return axios.delete(url);
}

const geminiChatApi = (prompt: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/ai/gemini`;
    return axios.post<{ text: string }>(url, { prompt });
};

export {getUsersApi,createUserApi,updateUserApi,deleteUserApi,geminiChatApi};