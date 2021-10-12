import axios from "axios";

const headers: { [key: string]: string } = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};

const axiosBuilder = (token?: string) => {
  if (token) {
    headers["Authorization"] = "bearer " + token;
  }
  return axios.create({
    baseURL: "http://localhost:7878/hpi/",
    headers: { ...headers },
  });
};

export default axiosBuilder;
