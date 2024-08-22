import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lumibank-backend-edqo6jv53q-et.a.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosNode = axios.create({
  baseURL: "https://lumibank-api-fsw-edqo6jv53q-et.a.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosNode.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// REFRESH TOKEN INTERCEPTOR
// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (originalConfig.url !== "/auth/login" && err.response) {
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const response = await axiosInstance.post("/auth/refresh-token", {
//             refreshToken: localStorage.getItem("refreshToken"),
//           });

//           const { jwt_token } = response.data;
//           localStorage.setItem("token", jwt_token);
//           axiosInstance.defaults.headers[
//             "Authorization"
//           ] = `Bearer ${jwt_token}`;

//           return axiosInstance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
