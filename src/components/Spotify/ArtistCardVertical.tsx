import React from "react";
import Image from "next/image";
import Link from "next/link";
import GenreTags from "./GenreTags";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { ExternalLink } from "lucide-react";
import { NO_IMAGE } from "@/constants/SpotifyConstants";
import { SpotifyArtistCard } from "@/dto/Spotify/SpotifyArtistCardDto";

const ArtistCardVertical = React.forwardRef<HTMLElement, SpotifyArtistCard>(
  ({ id, name, img, genres, followers, pop, url, alt }, ref) => {
    const netLink = `/network/${name}_${id}`;
    return (
      <section
        ref={ref}
        className="relative w-full max-w-[13rem] rounded-md hover:mb-0 hover:bg-blue-950/20 dark:hover:bg-slate-400/20 lg:max-w-[15rem]">
        {/* Artist Music Info */}
        <article className="flex flex-col gap-2 rounded-t-md py-3 backdrop-blur-md">
          <Link
            href={netLink}
            className="flex flex-col items-center text-center">
            <Image
              className="h-28 w-28 rounded-[50%] object-cover lg:h-32 lg:w-32"
              width={100}
              height={100}
              src={img ? img : NO_IMAGE}
              alt={alt}
            />
            <h2 className="horizontal-mask mt-2 line-clamp-1 w-40 bg-slate-200/40 text-2xl font-medium dark:bg-slate-400/20 lg:text-3xl">
              {name}
            </h2>
          </Link>
          <GenreTags
            id={id}
            items={genres}
            className="bg-slate-200/40 dark:bg-slate-500/80"
          />
        </article>

        {/* Artist Social Info */}
        <article>
          <Link
            href={netLink}
            className="grid grid-cols-2 gap-1 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center bg-slate-200/40 py-2 text-center dark:bg-slate-600/60">
              <h3 className="text-sm font-normal lg:text-base">Followers</h3>
              <p className="text-sm font-medium lg:text-base">
                {abbreviateNumber(followers)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-slate-200/40 py-2 text-center dark:bg-slate-600/60">
              <h3 className="text-sm font-normal lg:text-base">Popularity</h3>
              <p className="text-sm font-medium lg:text-base">{pop}</p>
            </div>
          </Link>
        </article>

        {/* Spotify Link to Artist */}
        <article className="rounded-b-md bg-[#1DB954] text-black">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-center">
            Spotify
            <ExternalLink className="mb-2 h-[.7rem] w-auto" />
          </Link>
        </article>

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

ArtistCardVertical.displayName = "ArtistCardVertical";

export default ArtistCardVertical;
