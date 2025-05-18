import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "https://re-assignment-twelfth-server.vercel.app",
  withCredentials: true,
});
