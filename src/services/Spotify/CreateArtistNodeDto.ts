import { SpotifyArtist } from "@/schema/Spotify/SpotifyArtistSchema";
import { SpotifyArtistNode } from "@/dto/Spotify/SpotifyArtistNodeDto";

const createArtistNodeDto = (artistData: SpotifyArtist): SpotifyArtistNode => {
  return {
    id: artistData.id,
    name: artistData.name,
    img:
      artistData.images.length == 0
        ? null
        : artistData.images[artistData.images.length - 1].url,
    followers: artistData.followers.total,
    pop: artistData.popularity,
    genres: artistData.genres,
    size: Math.ceil(artistData.popularity / 10),
    url: artistData.external_urls.spotify,
    type: "artist",
  };
};

export default createArtistNodeDto;
