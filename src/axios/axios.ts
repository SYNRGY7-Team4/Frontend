import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-dev-synrgy-team4.koyeb.app/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstance;
