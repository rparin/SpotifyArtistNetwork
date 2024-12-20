import publicParsedEnv from "@env/publicEnv";
import { MAX_DEPTH } from "@/constants/SpotifyConstants";
import { SpotifyArtist } from "@/schema/Spotify/SpotifyArtistSchema";
import { SpotifyNetworkMap } from "@/dto/Spotify/SpotifyArtistNetworkDto";
import fetchSpotifyArtist from "@/actions/Spotify/fetchSpotifyArtist";
import fetchSpotifyRelatedArtists from "@/actions/Spotify/fetchSpotifyRelatedArtists";
import createArtistNodeDto from "@/services/Spotify/CreateArtistNodeDto";
import delay from "@/utils/delay";

const createArtistNetwork = async (
  accessToken: string,
  id: string,
  depth: number = 4
) => {
  if (depth > MAX_DEPTH) {
    throw new Error("Error fetching related artists: invalid depth");
  }

  const idNodes = new Set<string>();
  const networkMap: SpotifyNetworkMap = {
    nodes: [],
    links: [],
  };

  const getRelatedArtists = async (
    spotifyArtistData: SpotifyArtist,
    depth: number
  ) => {
    idNodes.add(spotifyArtistData.id);
    networkMap.nodes.push(createArtistNodeDto(spotifyArtistData));

    if (depth > 0) {
      await delay(publicParsedEnv.NEXT_PUBLIC_FETCH_ARTISTS_DELAY);
      const relatedArtists = await fetchSpotifyRelatedArtists(
        accessToken,
        spotifyArtistData.id
      );
      for (let i = 0; i < relatedArtists.length; i++) {
        if (spotifyArtistData.id != relatedArtists[i].id) {
          networkMap.links.push({
            source: spotifyArtistData.id,
            target: relatedArtists[i].id,
          });
        }
        if (!idNodes.has(relatedArtists[i].id)) {
          await getRelatedArtists(relatedArtists[i], depth - 1);
        }
      }
    }
  };

  const mainArtistData = await fetchSpotifyArtist(accessToken, id);
  await getRelatedArtists(mainArtistData, depth);
  return networkMap;
};

export default createArtistNetwork;
