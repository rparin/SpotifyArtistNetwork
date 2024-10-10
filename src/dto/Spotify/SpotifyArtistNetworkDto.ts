import { z } from "zod";
import { spotifyArtistNodeArrayDto } from "./SpotifyArtistNodeDto";
import { spotifyLinkItemArrayDto } from "./SpotifyLinkDto";

export const spotifyArtistNetworkDto = z.object({
  nodes: spotifyArtistNodeArrayDto,
  links: spotifyLinkItemArrayDto,
});

export type SpotifyNetworkMap = z.infer<typeof spotifyArtistNetworkDto>;
