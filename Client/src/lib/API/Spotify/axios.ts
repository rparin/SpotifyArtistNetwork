import axios from "axios";
import { publicParsedEnv } from "@env/publicEnv";

const BASE_URL = `${publicParsedEnv.NEXT_PUBLIC_SERVER_URL}`;

export const spotifyAPI = axios.create({
  baseURL: BASE_URL,
});
