import React from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import HorizontalList from "./UI/HorizontalList";
import { formatNumber, imageLoader } from "@/lib/utils";

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

const ArtistCardHorizontal = React.forwardRef<HTMLElement, artistCardType>(
  ({ id, name, img, alt, genres, followers, pop, url }, ref) => {
    return (
      <section ref={ref} className="relative w-96 rounded-md">
        <article className="flex items-center rounded-md py-2 gap-2 backdrop-blur-md px-2">
          <Image
            loader={() => {
              return imageLoader(img);
            }}
            className=" h-24 w-24 object-cover rounded-[50%]"
            width={100}
            height={100}
            src={img}
            alt={alt}
          />
          <div className="flex flex-col gap-1 w-64">
            <h2 className="flex text-xl font-medium line-clamp-1 justify-center text-center">
              {name}
            </h2>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex gap-2 bg-slate-200/40 dark:bg-slate-600/60 py-1 justify-center">
                <h3 className="text-xs font-normal">Followers</h3>
                <p className="font-medium text-xs">
                  {formatNumber(parseInt(followers))}
                </p>
              </div>
              <div className="flex gap-2 bg-slate-200/40 dark:bg-slate-600/60 py-1 justify-center">
                <h3 className="text-xs font-normal">Popularity</h3>
                <p className="font-medium text-xs">{pop}</p>
              </div>
            </div>
            {genres.length > 0 && (
              <HorizontalList
                id={id}
                items={genres}
                className="dark:bg-slate-500/80 bg-slate-200/40 text-xs"
              />
            )}

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 text-xs justify-center items-center text-center w-full rounded-br-md bg-[#1DB954] horizontal-mask">
              Spotify
              <ExternalLink className="w-auto h-[.7rem] mb-2" />
            </a>
          </div>
        </article>
        <Image
          loader={() => {
            return imageLoader(img);
          }}
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

ArtistCardHorizontal.displayName = "ArtistCardHorizontal";

export { ArtistCardHorizontal };
