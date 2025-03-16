import axios from "axios";

const customAPIController = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

customAPIController.interceptors.request.use(
  (config: any) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Clear the Storage and Log out.
customAPIController.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default customAPIController;
