// frontend/utils/socket.ts
// utils/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

if (!socket) {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
    transports: ["websocket"], // force websocket to avoid polling issues
  });
}

export default socket;

