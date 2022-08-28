import axios from "axios";

class Auth {
  async login(code) {
    try {
      const { data } = await axios.post("http://10.80.162.200:8080/auth/code", {
        code,
      });
      localStorage.setItem("access_token", data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
    } catch (error) {
      console.log(error);
    }
  }
  // async register() {}
  async checkLogin() {
    const response = await axios.post(
      "http://10.80.162.200:8080/auth/login",
      null,
      {
        Headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    );

    console.log(response);
  }
}

export default new Auth();
