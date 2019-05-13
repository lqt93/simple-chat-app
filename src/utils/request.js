import axios from "axios";

const fetchInstance = axios.create({
  baseURL: process.env.API_HOST || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default function request(options) {
  return fetchInstance({
    ...options
  });
}
