import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "query-string";
import axios from "axios";

const AuthLoadingPage = () => {
  const location = useLocation();
  const { search } = useLocation();
  const query = QueryString.parse(search);
  const navigate = useNavigate();

  console.log(query);

  // useEffect(() => {
  //   console.log(location);
  //   console.log(location.search);
  // }, [location]);

  const request = async (code) => {
    try {
      const { data } = await axios.post("http://10.80.161.222:8080/auth/code", {
        code,
      });
      localStorage.setItem("access_token", data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkOut = async () => {
    const response = await axios.post("http://10.80.161.222:8080/auth/", {
      Headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });

    console.log(response);
  };

  useEffect(() => {
    if (query) {
      request(query.code);
    }
  }, [query]);

  return <div>authLoadingPage</div>;
};

export default AuthLoadingPage;

// useEffect(() => {localStorage.setItem("?", JSON.stringify([])),[]}
