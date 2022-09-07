import axios from "axios";
import { ACCESS_KEY } from "../../constants/auth/auth.constant";
import { customAxios } from "../../lib/axios/customAxios";

class Auth {
  async login(code) {
    try {
      const { data } = await customAxios.post("/auth/code", {
        code,
      });
      localStorage.setItem(ACCESS_KEY, data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
    } catch (error) {
      console.log(error);
    }
  }
  // async register() {}
  async checkLogin() {
    const response = await customAxios.post("/auth/login", null, {
      Headers: {
        access_token: localStorage.getItem(ACCESS_KEY),
      },
    });

    console.log(response);
  }
}

export default new Auth();
