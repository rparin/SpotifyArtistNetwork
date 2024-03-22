import axios from "axios";
import { publicParsedEnv } from "@env/publicEnv";

export const spotifyAPI = axios.create({
  baseURL: publicParsedEnv.NEXT_PUBLIC_SERVER_URL,
});
