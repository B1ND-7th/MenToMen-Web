import axios from "axios";
import { ACCESS_KEY, REQUEST_KEY } from "../../constants/auth/auth.constant";

export const customAxios = axios.create({
  baseURL: "http://10.80.162.9:8080",
  headers: {
    [REQUEST_KEY]: `Bearer ${localStorage.getItem(ACCESS_KEY)}`,
  },
});
