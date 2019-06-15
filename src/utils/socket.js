import io from "socket.io-client";

const socketUrl = process.env.REACT_APP_API_HOST || "http://localhost:8000";

export let socket;

export const disconnectSocket = () => {
  socket.disconnect();
};

export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    try {
      socket = io(socketUrl);

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("disconnect", reason => {
        console.log(`Socket disconnected: ${reason}`);
      });

      socket.open();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
