import axios from "axios";

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
  baseURL: process.env.API_HOST || "http://localhost:8000",
  headers: axiosHeaders
});

export default function request(options) {
  return fetchInstance({
    ...options
  });
}
