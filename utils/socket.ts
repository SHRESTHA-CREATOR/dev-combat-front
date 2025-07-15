// frontend/utils/socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // use your backend URL in production
export default socket;
