import axios from "axios";

export default function request(options) {
  let axiosHeaders = {
    "Content-Type": "application/json"
  };

  try {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      axiosHeaders["authorization"] = localToken;
    }
  } catch (err) {
    console.log("parse token in requester err:", err);
  }

  const fetchInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST || "http://localhost:8000",
    headers: axiosHeaders
  });

  return fetchInstance({
    ...options
  });
}
