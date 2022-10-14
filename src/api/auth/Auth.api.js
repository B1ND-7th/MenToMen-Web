import axios from "axios";
import { ACCESS_KEY, REFRESH_KEY } from "../../constants/auth/auth.constant";
import { customAxios } from "../../lib/axios/customAxios";

class Auth {
  async login(code) {
    try {
      const { data } = await customAxios.post("/api/auth/code", {
        code,
      });
      localStorage.setItem(ACCESS_KEY, data.data.accessToken);
      localStorage.setItem(REFRESH_KEY, data.data.refreshToken);
    } catch (error) {
      console.log(error);
    }
  }

  async checkLogin() {
    const response = await customAxios.post("/api/auth/login", null);
  }
}

export default new Auth();
