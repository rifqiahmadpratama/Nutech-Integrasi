import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:3200/";

const PrivateAxios = () => {
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` },
  });

  let refreshRequest = false;

  axiosInstance.interceptors.request.use(async (req) => {
    if (token && !refreshRequest) {
      const user = jwt_decode(token);
      const isTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (isTokenExpired) {
        refreshRequest = true;
        const response = await axios.post(
          "http://localhost:3200/user/refresh-token",
          { refreshToken: localStorage.getItem("refreshToken") },
          {
            headers: { "Content-Type": "application/json" },
          },
          { withCredentials: true }
        );

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        req.headers.Authorization = `Bearer ${response.data.data.token}`;
      }
    }

    return req;
  });

  return axiosInstance;
};

export default PrivateAxios;
