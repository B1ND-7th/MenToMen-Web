import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QueryString from "query-string";
import axios from "axios";

const AuthLoadingPage = () => {
  const location = useLocation();
  const { search } = useLocation();
  const query = QueryString.parse(search);

  console.log(query);

  // useEffect(() => {
  //   console.log(location);
  //   console.log(location.search);
  // }, [location]);

  const request = async (code) => {
    try {
      const data = await axios.post("http://10.80.161.190:8080/auth/code", {
        code,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
