
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api", // your backend URL
  withCredentials: true, // if using cookies (optional)
});

export default api;
