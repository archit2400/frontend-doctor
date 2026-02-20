import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-doctor-aj6u.onrender.com/api"
});
//http://localhost:5000/api
export default API;
