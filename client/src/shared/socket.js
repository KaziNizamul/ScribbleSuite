import { io } from "socket.io-client";
const URL = process.env.NEXT_SOCKET_SERVER_URL;
export const socket = io(URL)