import { z } from "zod";
import { NodeDto } from "@/dto/Graph/NodeDto";
import { spotifyArtistNodeDto } from "@/dto/Spotify/SpotifyArtistNodeDto";

export const SpotifyGraphArtistNodeDto = spotifyArtistNodeDto.merge(NodeDto);
export type SpotifyGraphArtistNode = z.infer<typeof SpotifyGraphArtistNodeDto>;
