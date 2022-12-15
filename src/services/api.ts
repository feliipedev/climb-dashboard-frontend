import axios, { AxiosResponse, AxiosError } from "axios";
import fns from "./sessionStorage";

const headers = {
  "Access-Control-Request-Headers":
    "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers,
  proxy: false,
});

export default api;
