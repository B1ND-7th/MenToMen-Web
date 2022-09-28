import axios from "axios";
import {
  ACCESS_KEY,
  REFRESH_KEY,
  REQUEST_KEY,
} from "../../constants/auth/auth.constant";
import CONFIG from "../../config.json";

export const customAxios = axios.create({
  baseURL: `${CONFIG.server}`,
  headers: {
    [REQUEST_KEY]: `Bearer ${localStorage.getItem(ACCESS_KEY)}`,
  },
});

const errorInterceptor = async (config) => {
  const refresh_token = localStorage.getItem(REFRESH_KEY);

  console.log(config);

  const { status } = config.response;

  if (status === 401) {
    const originalRequest = config.config;

    try {
      const { data } = await axios.get(`${CONFIG.server}/auth/refreshToken`, {
        headers: {
          [REQUEST_KEY]: `Bearer ${refresh_token}`,
        },
      });
      localStorage.setItem(ACCESS_KEY, data.data.accessToken);

      customAxios.defaults.headers[
        REQUEST_KEY
      ] = `Bearer ${data.data.accessToken}`;

      originalRequest.headers[REQUEST_KEY] = `Bearer ${data.data.accessToken}`;
      return axios(originalRequest);
    } catch (error) {
      window.alert("리프레쉬 만료");
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    }
  }
};

customAxios.interceptors.response.use((response) => response, errorInterceptor);
