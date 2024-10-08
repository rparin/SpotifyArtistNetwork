import { ExternalLink } from "lucide-react";
import Image from "next/image";
import HorizontalList from "./UI/HorizontalList";
import React from "react";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

export interface artistCardType extends React.HtmlHTMLAttributes<HTMLElement> {
  name: string;
  img: string;
  alt: string;
  genres: Array<string>;
  followers: string;
  pop: string;
  url: string;
  id: string;
}

const ArtistCardVertical = React.forwardRef<HTMLElement, artistCardType>(
  ({ id, name, img, alt, genres, followers, pop, url }, ref) => {
    const netLink = `/network?id=${id}&network=${name}`;
    return (
      <section
        ref={ref}
        className="relative  w-full max-w-[13rem] lg:max-w-[15rem] hover:mb-0 hover:bg-blue-950/20 dark:hover:bg-slate-400/20 rounded-md">
        {/* Artist Music Info */}
        <article className="rounded-t-md flex flex-col py-3 gap-2 backdrop-blur-md">
          <Link
            href={netLink}
            className="flex flex-col text-center items-center">
            <Image
              className="h-28 w-28 lg:h-32 lg:w-32 object-cover rounded-[50%]"
              width={100}
              height={100}
              src={img}
              alt={alt}
            />
            <h2 className="text-2xl lg:text-3xl font-medium line-clamp-1 bg-slate-200/40 dark:bg-slate-400/20 horizontal-mask w-40 mt-2">
              {name}
            </h2>
          </Link>
          <HorizontalList
            id={id}
            items={genres}
            className="dark:bg-slate-500/80 bg-slate-200/40"
          />
        </article>

        {/* Artist Social Info */}
        <article>
          <Link
            href={netLink}
            className="grid grid-cols-2 gap-1 backdrop-blur-md">
            <div className="bg-slate-200/40 dark:bg-slate-600/60 flex flex-col justify-center items-center text-center py-2">
              <h3 className="text-sm lg:text-base font-normal">Followers</h3>
              <p className="font-medium text-sm lg:text-base">
                {formatNumber(parseInt(followers))}
              </p>
            </div>
            <div className="bg-slate-200/40 dark:bg-slate-600/60 flex flex-col justify-center items-center text-center py-2">
              <h3 className="text-sm lg:text-base font-normal">Popularity</h3>
              <p className="font-medium text-sm lg:text-base">{pop}</p>
            </div>
          </Link>
        </article>

        {/* Spotify Link to Artist */}
        <article className="bg-[#1DB954] text-black rounded-b-md">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1 justify-center items-center text-center">
            Spotify
            <ExternalLink className="w-auto h-[.7rem] mb-2" />
          </Link>
        </article>

        <Image
          className="absolute top-0 left-0 -z-10 h-full w-full opacity-80 dark:opacity-40 rounded-md"
          width={100}
          height={100}
          src={img}
          alt={alt}
        />
      </section>
    );
  }
);

ArtistCardVertical.displayName = "ArtistCardVertical";

export { ArtistCardVertical };
