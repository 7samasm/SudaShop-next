import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const headers: { [key: string]: string } = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};

const axiosBuilder = (token?: string) => {
  console.log(process.env.API_URL);
  if (token) {
    headers["Authorization"] = "bearer " + token;
  }
  return axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
    headers: { ...headers },
  });
};

export default axiosBuilder;
