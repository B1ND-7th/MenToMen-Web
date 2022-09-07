import axios from "axios";
import {
  ACCESS_KEY,
  REFRESH_KEY,
  REQUEST_KEY,
} from "../../constants/auth/auth.constant";

export const customAxios = axios.create({
  baseURL: "http://10.80.162.20:8080",
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
      const { data } = await axios.get(
        "http://10.80.162.20:8080/auth/refreshToken",
        {
          headers: {
            [REQUEST_KEY]: `Bearer ${refresh_token}`,
          },
        }
      );
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
