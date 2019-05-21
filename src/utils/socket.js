import io from "socket.io-client";

export default io(process.env.REACT_APP_API_HOST || "http://localhost:8000");
