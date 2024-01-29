import axios from "axios";

export default function axiosConfig(store){
    axios.defaults.baseURL = "http://localhost:5000"
    // axios.interceptors.request.use(config=>{
    //     if(!config.headers.Authorization){
    //         const token = localStorage.getItem("token") 
    //         if(token){
    //             config.headers.Authorization = "Bearer" + token
    //         }
    //     }
    // }, error => Promise.reject(error))
}