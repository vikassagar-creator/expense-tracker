import axios from "axios";

// Centralizes token attachment + 401 handling so pages don't need
// to manually build Authorization headers or handle expired tokens
// themselves.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attaches the token automatically to every request.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Any 401 (except from login/register themselves) clears the
// token and boots the user to /login.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const isAuthEndpoint =
      url.includes("/users/login") || url.includes("/users/register");

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
