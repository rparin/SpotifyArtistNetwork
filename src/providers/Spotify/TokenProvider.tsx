"use client";

import { createContext, useState, ReactNode, useLayoutEffect } from "react";
import { SpotifyToken } from "@/schema/Spotify/SpotifyTokenSchema";
import useFetchSpotifyToken from "@/hooks/Spotify/useFetchSpotifyToken";

const TokenContext = createContext<SpotifyToken["access_token"]>(
  {} as SpotifyToken["access_token"]
);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<SpotifyToken["access_token"]>(null);

  const tokenRes = useFetchSpotifyToken();
  useLayoutEffect(() => {
    if (tokenRes.data) {
      setToken(tokenRes.data.access_token);
    }
  }, [tokenRes.data]);

  if (tokenRes.isError) {
    console.log(tokenRes.error);
  }

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export default TokenContext;
