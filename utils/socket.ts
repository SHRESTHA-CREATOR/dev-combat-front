// frontend/utils/socket.ts
import { io } from "socket.io-client";

const socket = io("https://dev-combat-backend.onrender.com"); // use your backend URL in production
export default socket;


