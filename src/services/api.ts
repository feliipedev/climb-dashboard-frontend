import axios, { AxiosResponse, AxiosError } from "axios";
import fns from "./sessionStorage";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers,
  proxy: false,
});

api.interceptors.request.use(
  (config) => {
    const token = fns.get("token");

    if (token) {
      try {
        //@ts-ignore
        config.headers.common["Session-Token"] = token;
      } catch (e) {
        console.error(e);
        //cookies.user.remove() remover token
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

api.interceptors.response.use(onResponse, onResponseError);

export default api;
