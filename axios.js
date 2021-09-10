import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};

const axiosBuilder = (token) => {
  return axios.create({
    baseURL: "http://localhost:3000/hpi",
    headers: { ...headers, Authorization: "bearer " + token },
  });
};

export default axiosBuilder;
