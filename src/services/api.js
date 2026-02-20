import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-doctor-aj6u.onrender.com"
});

export default API;
