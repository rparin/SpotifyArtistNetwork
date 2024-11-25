import React from "react";
import Image from "next/image";
import GenreTags from "./GenreTags";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ExternalLink } from "lucide-react";
import { NO_IMAGE } from "@/constants/SpotifyConstants";
import { SpotifyArtistCard } from "@/dto/Spotify/SpotifyArtistCardDto";

const ArtistCardHorizontal = React.forwardRef<HTMLElement, SpotifyArtistCard>(
  ({ id, name, img, genres, followers, pop, url, alt }, ref) => {
    return (
      <section ref={ref} className="relative w-[22rem] rounded-md md:w-96">
        <div className="flex items-center gap-2 rounded-md px-2 py-2 backdrop-blur-md">
          <Image
            className="h-20 w-20 rounded-[50%] object-cover md:h-24 md:w-24"
            width={100}
            height={100}
            src={img ? img : NO_IMAGE}
            alt={alt}
          />
          <div className="flex w-60 flex-col gap-1 md:w-64">
            <h2 className="line-clamp-1 flex justify-center text-center text-sm font-medium leading-tight md:text-base md:leading-none">
              {name}
            </h2>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex justify-center gap-2 bg-slate-200/40 py-1 dark:bg-slate-600/60">
                <h3 className="text-xs font-normal">Followers</h3>
                <p className="text-xs font-medium">
                  {abbreviateNumber(followers)}
                </p>
              </div>
              <div className="flex justify-center gap-2 bg-slate-200/40 py-1 dark:bg-slate-600/60">
                <h3 className="text-xs font-normal">Popularity</h3>
                <p className="text-xs font-medium">{pop}</p>
              </div>
            </div>
            {genres.length > 0 && (
              <GenreTags
                id={id}
                items={genres}
                className="bg-slate-200/40 text-xs dark:bg-slate-500/80"
              />
            )}

            {/* Spotify Link to Artist */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="horizontal-mask flex w-full items-center justify-center gap-0.5 rounded-br-md bg-[#1DB954] text-center text-xs text-black">
              Spotify
              <ExternalLink className="mb-1 h-[.7rem] w-auto" />
            </a>
          </div>
        </div>
        <Image
          className="absolute left-0 top-0 -z-10 h-full w-full rounded-md opacity-80 dark:opacity-40"
          width={100}
          height={100}
          src={img ? img : NO_IMAGE}
          alt={alt}
        />
      </section>
    );
  }
);

ArtistCardHorizontal.displayName = "ArtistCardHorizontal";

export default ArtistCardHorizontal;
