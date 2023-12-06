import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

export const spotifyAPI = axios.create({
  baseURL: BASE_URL,
});
