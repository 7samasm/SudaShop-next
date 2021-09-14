import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};

const axiosBuilder = (token, isRealUrl = false) => {
  // default is useing proxy url insted of real one
  let baseURL = "/api/proxy/active-slug";
  if (isRealUrl) {
    baseURL = "http://localhost:3000/hpi/";
  }
  if (token) {
    headers["Authorization"] = "bearer " + token;
  }
  return axios.create({
    baseURL,
    headers: { ...headers },
  });
};

export default axiosBuilder;
